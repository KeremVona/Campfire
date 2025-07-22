import db from "../../../db.js";

/**
 * Makes a new game with optional general and country-specific rules,
 * and adds the host as the first player.
 *
 * Route: POST /api/games
 *
 * @param {Object} req - The Express request object (expects game data in body and user ID in `req.user`).
 * @param {Object} res - The Express response object.
 * @returns {Object} A JSON object containing the made game's details.
 */
export const postGameHandler = async (req, res) => {
  const {
    title,
    description,
    start_time,
    maxPlayers,
    generalRules,
    countryRules,
    invite,
    is_ranked,
  } = req.body;

  const userId = req.user; // The ID of the currently authenticated user (host)

  try {
    // Insert the new game into the `games` table
    const gameResult = await db.query(
      `INSERT INTO games (
        host_id, title, description, start_time, max_players,
        invite, is_ranked
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        userId,
        title,
        description,
        start_time || null, // Allow null for optional start_time
        maxPlayers,
        invite || null, // Allow null for optional invite code
        is_ranked ?? false, // Default to false if undefined
      ]
    );

    const gameId = gameResult.rows[0].id;

    // Automatically add the host to the `game_players` table
    await db.query(
      `INSERT INTO game_players (game_id, user_id) VALUES ($1, $2)`,
      [gameId, userId]
    );

    // Insert general rules (if any)
    for (const rule of generalRules || []) {
      await db.query(
        `INSERT INTO game_rules (game_id, which_rule, description)
         VALUES ($1, 'general', $2)`,
        [gameId, rule]
      );
    }

    // Insert country-specific rules (if any)
    for (const rule of countryRules || []) {
      await db.query(
        `INSERT INTO game_rules (game_id, which_rule, country, description)
         VALUES ($1, 'country', $2, $3)`,
        [gameId, rule.country, rule.description]
      );
    }

    // Respond with the created game object
    res.status(201).json(gameResult.rows[0]);
  } catch (err) {
    // Log and return a server error
    console.error("Error making game:", err);
    res.status(500).json({ error: "Failed to make game." });
  }
};
