import db from "../../../db.js";

/**
 * Retrieves the list of players in a specific game.
 *
 * Route: GET /api/games/:id/players
 *
 * @param {Object} req - The request object from Express.
 * @param {Object} res - The response object from Express.
 * @returns {Object} A JSON response containing the list of players (id and username).
 */
export const getPlayersGameHandler = async (req, res) => {
  // Extract the game ID from the URL parameters
  const { id } = req.params;

  try {
    // Query to fetch all players in the game with the given ID
    const result = await db.query(
      `
      SELECT u.id, u.username
      FROM game_players gp
      JOIN users u ON gp.user_id = u.id
      WHERE gp.game_id = $1
      ORDER BY gp.joined_at ASC
      `,
      [id] // Parameterized to prevent SQL injection
    );

    // Send the list of players back to the client
    res.json({ players: result.rows });
  } catch (err) {
    // Log the error and return a 500 error response
    console.error("Failed to fetch game players:", err);
    res.status(500).json({ error: "Failed to fetch players" });
  }
};
