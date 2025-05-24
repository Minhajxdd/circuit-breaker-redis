import { Application, RequestHandler } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

type Route = {
    url: string;
    middlewares: RequestHandler[];
    proxy: Parameters<typeof createProxyMiddleware>[0];
};

const proxy = {
    setupProxy: (app: Application, routes: Route[]) => {
        routes.forEach(({url, proxy, middlewares}) => {
            app.use(`/api`+url, middlewares, createProxyMiddleware(proxy));
        });
    }
};

export default proxy;
