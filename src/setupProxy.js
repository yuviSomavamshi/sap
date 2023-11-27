const { createProxyMiddleware } = require("http-proxy-middleware");
const Product = require("./assets/json/product.json");

const CONTROLLER_URL = process.env.CONTROLLER_URL || "http://localhost:8080";
const API_CONFIGURATION = {
  target: CONTROLLER_URL,
  changeOrigin: false,
  secure: false,
  xfwd: true,
  logLevel: "info"
};

module.exports = function (app) {
  app.use(createProxyMiddleware("/api", API_CONFIGURATION));
  app.use(createProxyMiddleware("/event-stream", API_CONFIGURATION));
  app.use(createProxyMiddleware(`/${Product.page.base}/docs`, API_CONFIGURATION));
  app.use(createProxyMiddleware(`/${Product.page.base}/captures`, API_CONFIGURATION));
  app.use(createProxyMiddleware(`/${Product.page.base}/exports`, API_CONFIGURATION));
};
