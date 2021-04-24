import dotenv  from "dotenv";
import express from "express";
import path    from "path";

import * as routes from "./routes";

dotenv.config({
  path: "./local/envrc"
});

const port = process.env.SERVER_PORT;
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

routes.register(app);

// // start the Express server
// app.listen(port, () => {
//   // tslint:disable-next-line:no-console
//   console.log(`server started at http://localhost:${port}`);
// });

import * as http from "http";
// import * as proxy from "http-proxy";

const server = http.createServer(app);
// const ws     = proxy.createProxyServer({ ws: true });

server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
