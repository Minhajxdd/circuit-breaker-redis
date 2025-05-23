import { Application, RequestHandler } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

type Route = {
    url: string;
    authServices: RequestHandler[];
    proxy: Parameters<typeof createProxyMiddleware>[0];
};

const proxy = {
    setupProxy: (app: Application, routes: Route[]) => {
        routes.forEach((route) => {
            app.use(route.url, route.authServices, createProxyMiddleware(route.proxy));
        });
    }
};

export default proxy;
