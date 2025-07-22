import db from "../../../db.js";

/**
 * Retrieves detailed information about a specific game by ID,
 * including the host's username, general rules, and country-specific rules.
 *
 * Route: GET /api/games/:id
 *
 * @param {Object} req - The Express request object (expects `id` in URL params).
 * @param {Object} res - The Express response object.
 * @returns {Object} A JSON object containing game details, host name,
 *                   general rules (as strings), and country rules (with country + description).
 */
export const getIdGameHandler = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch game data and the host's username by joining games and users tables
    const gameRes = await db.query(
      `SELECT g.*, u.username AS host_name
       FROM games g
       JOIN users u ON g.host_id = u.id
       WHERE g.id = $1`,
      [id]
    );

    const game = gameRes.rows[0];

    // If no game found, return 404 Not Found
    if (!game) return res.status(404).json({ error: "Game not found" });

    // Fetch all rules related to this game
    const rulesRes = await db.query(
      "SELECT * FROM game_rules WHERE game_id = $1",
      [id]
    );

    // Filter and map general rules (only descriptions)
    const generalRules = rulesRes.rows
      .filter((r) => r.which_rule === "general")
      .map((r) => r.description);

    // Filter and map country-specific rules (include country + description)
    const countryRules = rulesRes.rows
      .filter((r) => r.which_rule === "country")
      .map((r) => ({ country: r.country, description: r.description }));

    // Return combined game info with rules
    res.json({ ...game, generalRules, countryRules });
  } catch (err) {
    // Log error and return 500 Internal Server Error
    console.error("Failed to fetch game details:", err);
    res.status(500).json({ error: "Failed to load game details." });
  }
};
