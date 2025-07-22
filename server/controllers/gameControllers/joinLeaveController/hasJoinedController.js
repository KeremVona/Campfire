import db from "../../../db.js";

/**
 * Checks if the currently authenticated user has joined a specific game.
 *
 * Route: GET /api/games/:id/has-joined
 *
 * @param {Object} req - The Express request object (expects game ID in `req.params.id` and user ID in `req.user.id`).
 * @param {Object} res - The Express response object.
 * @returns {Object} A JSON object: { hasJoined: true/false }.
 */
export const hasJoinedGameHandler = async (req, res) => {
  const userId = req.user.id; // ID of the currently logged-in user
  const { id } = req.params; // ID of the game to check

  try {
    // Query the game_players table to check if the user has joined the game
    const result = await db.query(
      "SELECT 1 FROM game_players WHERE game_id = $1 AND user_id = $2",
      [id, userId]
    );

    // Respond with true if the user has joined, otherwise false
    res.json({ hasJoined: result.rows.length > 0 });
  } catch (err) {
    // Log the error and return a 500 Internal Server Error
    console.error("Failed to check if user has joined:", err);
    res.status(500).json({ error: "Failed to check participation" });
  }
};
