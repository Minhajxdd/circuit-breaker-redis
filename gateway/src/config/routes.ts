
const ROUTES = [
    {
        url: '/posts',
        authServices: [],
        proxy: {
            target: "https://jsonplaceholder.typicode.com",
            changeOrigin: true,
            pathRewrite: {
                [`^/api`]: '',
            },
        }
    },
]

export default ROUTES;