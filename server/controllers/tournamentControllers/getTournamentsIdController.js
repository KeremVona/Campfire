import db from "../../db.js";

export const getTournamentByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM tournaments WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Tournament not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching tournament:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
