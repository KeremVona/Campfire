import db from "../../../db.js";

export const getTournamentTeamsHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      "SELECT * FROM tournament_teams WHERE tournament_id = $1",
      [id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(`Error fetching tournament teams: ${err.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};
