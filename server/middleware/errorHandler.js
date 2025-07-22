import logger from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
  logger.error("Unhandled error:", err.stack || err.message);
  res.status(500).json({ error: "Unexpected server error" });
};

export default errorHandler;
