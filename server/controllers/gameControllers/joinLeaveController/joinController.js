import db from "../../../db.js";

/**
 * Adds the authenticated user to a specific game if they haven't already joined.
 * Also returns the updated player count for the game.
 *
 * Route: POST /api/games/join
 *
 * @param {Object} req - The Express request object (expects `id` in `req.body`, and user ID in `req.user.id`).
 * @param {Object} res - The Express response object.
 * @returns {Object} A JSON object containing a message and the current player count.
 */
export const joinGameHandler = async (req, res) => {
  const userId = req.user.id; // Authenticated user's ID
  const { id } = req.body; // ID of the game to join

  // Validate input
  if (!id) {
    return res.status(400).json({ error: "Missing gameId, id in code" });
  }

  try {
    // Check if the user has already joined this game
    const existing = await db.query(
      "SELECT * FROM game_players WHERE game_id = $1 AND user_id = $2",
      [id, userId]
    );

    // If not joined, insert into the game_players table
    if (existing.rows.length === 0) {
      await db.query(
        "INSERT INTO game_players (game_id, user_id) VALUES ($1, $2)",
        [id, userId]
      );
    }

    // Get updated count of players in the game
    const countRes = await db.query(
      "SELECT COUNT(*) FROM game_players WHERE game_id = $1",
      [id]
    );

    const count = parseInt(countRes.rows[0].count, 10);

    // Respond with success message and player count
    res.status(200).json({ message: "Joined game", playerCount: count });
  } catch (err) {
    // Log and handle any database or server errors
    console.error("Join error:", err.message);
    res.status(500).json({ error: "Failed to join game" });
  }
};
