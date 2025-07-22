import db from "../../../db.js";

/**
 * Retrieves a list of all games with relevant details.
 *
 * Route: GET /api/gamesreq
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Object} A JSON array of game objects including host username and game details.
 */
export const getGameHandler = async (req, res) => {
  try {
    // Query to fetch all games along with their host's username
    const result = await db.query(`
      SELECT 
        g.id,
        g.title,
        g.description,
        g.max_players,
        g.is_ranked,
        g.invite,
        g.start_time,
        g.status,
        g.made_at,
        u.username AS host_name,
        (
          SELECT COUNT(*) 
          FROM game_players gp 
          WHERE gp.game_id = g.id
        ) AS player_count
      FROM games g
      JOIN users u ON g.host_id = u.id
      ORDER BY g.start_time DESC
    `);

    // Return the list of games in descending order of start time
    res.json(result.rows);
  } catch (err) {
    // Log error and respond with a 500 error message
    console.error("Error loading games:", err);
    res.status(500).json({ error: "Failed to load games" });
  }
};
