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

// ---

import * as http        from "http";
import { createProxy }  from "http-proxy";

const server = http.createServer(app);
const proxy  = createProxy({
  target: {
    host: 'localhost',
    port: 8082
  },
  ws: true
});

server.on('upgrade', (req: any, socket: any, head: any) => {
  console.log(`ws upgrade for '${ req.url }'`);
  proxy.ws(req, socket, head);
});

server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

const server2 = http.createServer(app);
server2.listen(8082, () => {
  console.log(`server started at http://localhost:8082`);
});
