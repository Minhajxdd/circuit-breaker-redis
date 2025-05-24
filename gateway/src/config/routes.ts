
const ROUTES = [
    {
        url: '/posts',
        middlewares: [],
        proxy: {
            target: process.env.POSTS_SERVICE_URL,
            changeOrigin: true,
        }
    },
]

export default ROUTES;