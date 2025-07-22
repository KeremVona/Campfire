import db from "../../../db.js";

/**
 * Removes the authenticated user from a specific game and returns the updated player count.
 *
 * Route: POST /api/games/leave
 *
 * @param {Object} req - The Express request object (expects `id` in `req.body`, and user ID in `req.user.id`).
 * @param {Object} res - The Express response object.
 * @returns {Object} A JSON object containing a message and the current player count.
 */
export const leaveGameHandler = async (req, res) => {
  const userId = req.user.id; // Authenticated user's ID
  const { id } = req.body; // ID of the game to leave

  // Validate input
  if (!id) {
    return res.status(400).json({ error: "Missing gameId, id in code" });
  }

  try {
    // Remove the user from the game_players table
    await db.query(
      "DELETE FROM game_players WHERE game_id = $1 AND user_id = $2",
      [id, userId]
    );

    // Get the new count of players in the game
    const countRes = await db.query(
      "SELECT COUNT(*) FROM game_players WHERE game_id = $1",
      [id]
    );

    const count = parseInt(countRes.rows[0].count, 10);

    // Respond with success message and updated player count
    res.status(200).json({ message: "Left game", playerCount: count });
  } catch (err) {
    // Log the error and respond with 500 Internal Server Error
    console.error("Leave error:", err.message);
    res.status(500).json({ error: "Failed to leave game" });
  }
};
