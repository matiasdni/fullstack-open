/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:3003",
      changeOrigin: true,
    })
  );
};
