const log = (...args) => {
  const timestamp = new Date().toISOString();
  console.log(`[INFO] [${timestamp}]`, ...args);
};

const error = (...args) => {
  const timestamp = new Date().toISOString();
  console.error(`[ERROR] [${timestamp}]`, ...args);
};

const warn = (...args) => {
  const timestamp = new Date().toISOString();
  console.warn(`[WARN] [${timestamp}]`, ...args);
};

export default {
  log,
  error,
  warn,
};
