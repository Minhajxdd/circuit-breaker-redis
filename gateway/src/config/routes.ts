import { authenticateToken } from "../middlewares/authenticate-token.js";

const ROUTES = [
  {
    url: "/auth",
    middlewares: [],
    proxy: {
      target: process.env.Auth_SERVICE_URL,
      changeOrigin: true,
    },
  },
  {
    url: "/profile",
    middlewares: [authenticateToken],
    proxy: {
      target: process.env.Profile_SERVICE_URL,
      changeOrigin: true,
    },
  },
  {
    url: "/posts",
    middlewares: [authenticateToken],
    proxy: {
      target: process.env.POSTS_SERVICE_URL,
      changeOrigin: true,
    },
  },
];

export default ROUTES;
