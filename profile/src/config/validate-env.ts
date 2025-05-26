const requiredEnvVars = [
  "PORT",
  "DB_USERNAME",
  "DB_PASSWORD",
  "DB_NAME",
  "DB_HOST",
  "DB_PORT",
  "REDIS_HOST",
  "REDIS_PORT",
  "AUTH_SERVICE"
];

export default function validateEnv() {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length) {
    throw new Error(
      `❌ Missing required environment variables: ${missing.join(", ")}`
    );
    process.exit(1);
  }
}
