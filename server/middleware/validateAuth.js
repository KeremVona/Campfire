const validateAuth = (req, res, next) => {
  const { email, username, password } = req.body;

  const isEmailValid = (email) =>
    typeof email === "string" &&
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})$/.test(email);

  // Normalize path (for use with routes like /api/auth/register)
  const path = req.path.toLowerCase();

  if (path.includes("/register")) {
    if (![email, username, password].every(Boolean)) {
      return res.status(400).json({ error: "Missing credentials" });
    }

    if (!isEmailValid(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
  }

  if (path.includes("/login")) {
    if (![email, password].every(Boolean)) {
      return res.status(400).json({ error: "Missing credentials" });
    }

    if (!isEmailValid(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
  }

  next();
};

export default validateAuth;
