import db from "../../../db.js";

/**
 * DELETE /api/games/:id
 * Deletes a game and all related data (players and rules) from the database.
 * Only the host of the game is authorized to delete it.
 *
 * @param {Object} req - Express request object
 * @param {Object} req.params - Route parameters
 * @param {string} req.params.id - ID of the game to be deleted
 * @param {Object} req.user - Authenticated user ID (host)
 * @param {Object} res - Express response object
 */
export const deleteGameHandler = async (req, res) => {
  const gameId = req.params.id; // Extract game ID from route params
  const userId = req.user; // Authenticated user ID (host)

  try {
    // Check if the game exists and if the requesting user is the host
    const result = await db.query(
      "SELECT * FROM games WHERE id = $1 AND host_id = $2",
      [gameId, userId]
    );

    if (result.rows.length === 0) {
      // If no matching game found, deny access
      return res
        .status(403)
        .json({ error: "You are not the host of this game." });
    }

    // Delete all players associated with the game
    await db.query("DELETE FROM game_players WHERE game_id = $1", [gameId]);

    // Delete all rules associated with the game
    await db.query("DELETE FROM game_rules WHERE game_id = $1", [gameId]);

    // Delete the game itself
    await db.query("DELETE FROM games WHERE id = $1", [gameId]);

    // Respond with success message
    res.json({ message: "Game deleted successfully." });
  } catch (error) {
    // Handle and log any errors that occur
    console.error("Error deleting game:", error);
    res.status(500).json({ error: "Server error" });
  }
};
