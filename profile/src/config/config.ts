export default () => ({
  redisConfiguration: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
  services: {
    auth_service: process.env.AUTH_SERVICE,
  },
});
