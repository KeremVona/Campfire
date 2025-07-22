import db from "../../../db.js";

/**
 * Kick a player from a game lobby.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {number} req.body.gameId - ID of the game
 * @param {number} req.body.playerId - ID of the player to be kicked
 * @param {number} req.user.id - ID of the user making the request (host)
 */
export const kickGameHandler = async (req, res) => {
  const { gameId, playerId } = req.body;
  const hostId = req.user.id; // The user making the request (should be the host)

  try {
    // Check if the game exists and get the host_id from the database
    const gameRes = await db.query("SELECT host_id FROM games WHERE id = $1", [
      gameId,
    ]);

    if (gameRes.rows.length === 0) {
      return res.status(404).json({ error: "Game not found." });
    }

    const actualHostId = gameRes.rows[0].host_id;

    // Only allow the host of the game to kick players
    if (hostId !== actualHostId) {
      return res.status(403).json({ error: "Only the host can kick players." });
    }

    // Delete the player from the game_players table
    await db.query(
      "DELETE FROM game_players WHERE game_id = $1 AND user_id = $2",
      [gameId, playerId]
    );

    // (Optional) Count remaining players in the game after the kick
    const countRes = await db.query(
      "SELECT COUNT(*) FROM game_players WHERE game_id = $1",
      [gameId]
    );
    const playerCount = parseInt(countRes.rows[0].count, 10);

    // Return success message with updated player count
    res.json({ message: "Player kicked.", playerCount });
  } catch (err) {
    console.error("Kick error:", err.message);
    res.status(500).json({ error: "Failed to kick player." });
  }
};
