import db from "../../../db.js";

export const postTournamentApplicationsHandler = async (req, res) => {
  const userId = req.user; // assuming authorize sets req.user to ID
  const tournamentId = req.params.id;
  const { steam_profile_url, comment } = req.body;

  if (!steam_profile_url) {
    return res.status(400).json({ error: "Steam profile URL is required." });
  }

  try {
    const userResult = await db.query("SELECT email FROM users WHERE id = $1", [
      userId,
    ]);
    const email = userResult.rows[0]?.email;

    await db.query(
      `INSERT INTO tournament_applications 
       (tournament_id, user_id, steam_profile_url, comment, email)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (tournament_id, user_id) DO NOTHING`,
      [tournamentId, userId, steam_profile_url, comment, email]
    );

    res.status(201).json({ message: "Application submitted." });
  } catch (err) {
    console.error("Error applying:", err);
    res.status(500).json({ error: "Server error." });
  }
};
