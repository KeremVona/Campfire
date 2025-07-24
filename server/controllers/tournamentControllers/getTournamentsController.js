import db from "../../db.js";

/**
 * Get a list of all tournaments with metadata including status.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response containing an array of tournaments
 */
export const getTournamentHandler = async (req, res) => {
  try {
    // Query to get tournament details with organizer username and status
    const result = await db.query(`
      SELECT 
        t.id, 
        t.name, 
        t.description, 
        t.start_date, 
        t.entry_fee, 
        t.prize_pool, 
        t.is_active, 
        t.organizer_id, 
        u.username AS organizer_name,
        CASE 
          WHEN NOW() < t.start_date THEN 'Upcoming'       -- If current time is before start, it's upcoming
          WHEN NOW() >= t.start_date AND t.is_active THEN 'Ongoing'  -- If started and active, it's ongoing
          ELSE 'Finished'                                  -- Otherwise it's finished
        END AS status
      FROM tournaments t
      JOIN users u ON t.organizer_id = u.id               -- Join to get organizer's username
      ORDER BY t.start_date ASC;                          -- Sort tournaments by start time (soonest first)
    `);

    // Return the list of tournaments
    res.json({ tournaments: result.rows });
  } catch (err) {
    console.error("Failed to fetch tournaments", err);
    res.status(500).json({ error: "Failed to fetch tournaments" });
  }
};
