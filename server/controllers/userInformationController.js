import db from "../db.js";

export const getUserInformationHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await db.query("SELECT username FROM users WHERE id = $1", [
      userId,
    ]);
    // console.log("User ID from token:", req.user.id);
    // console.log("User ID: ", userId);
    if (user.rows.length > 0) {
      res.json({ id: userId, username: user.rows[0].username });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json("Server error, check console in editor");
  }
};
