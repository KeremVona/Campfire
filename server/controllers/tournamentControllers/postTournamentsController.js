import db from "../../../db.js";

/**
 * Handler to make a new tournament. Only accessible to admin users.
 *
 * @param {Object} req - Express request object
 * @param {Object} req.user - Authenticated user object
 * @param {number} req.user.id - ID of the currently logged-in user
 * @param {boolean} req.user.is_admin - Whether the user is an admin
 * @param {Object} req.body - Request body containing tournament details
 * @param {string} req.body.name - Name of the tournament (required)
 * @param {string} req.body.description - Description of the tournament (required)
 * @param {number} [req.body.entry_fee] - Entry fee in cents (optional)
 * @param {number} [req.body.prize_pool] - Prize pool in cents (optional)
 * @param {string} req.body.start_date - Start date of the tournament (required)
 * @param {number} [req.body.max_teams] - Maximum number of teams allowed (optional)
 *
 * @param {Object} res - Express response object
 * @returns {Object}
 */
export const postTournamentHandler = async (req, res) => {
  try {
    // Destructure user info from the authenticated request
    const { id: userId, is_admin } = req.user;

    // Only allow admins to make tournaments
    if (!is_admin) return res.status(403).json({ error: "Access denied" });

    // Extract fields from request body
    const { name, description, entry_fee, prize_pool, start_date, max_teams } =
      req.body;

    // Check for required fields
    if (!name || !description || !start_date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Insert the new tournament into the database
    const result = await db.query(
      `
      INSERT INTO tournaments 
        (organizer_id, name, description, entry_fee, prize_pool, start_date, max_teams)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
      `,
      [userId, name, description, entry_fee, prize_pool, start_date, max_teams]
    );

    // Respond with the newly made tournament
    res.status(201).json({ tournament: result.rows[0] });
  } catch (err) {
    // Log and handle any unexpected server error
    console.error("Make tournament error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
