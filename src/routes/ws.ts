import * as express    from "express";
import * as http       from "http";
import * as playwright from "playwright";
import { createProxy } from "http-proxy";

export const register = (app: express.Application) => {
  // NOTE:
  //
  // Each websocket request to `/chromium` spins up its own new playwright
  // BrowserServer. This might actually be desired, in the interest of test
  // isolation. Or, perhaps we want to maintain a pool for the sake of speed
  // and resource constraints.
  app.get("/chromium", async (req: any, res) => {
    console.info(req.xhr);
    const server = await playwright.chromium.launchServer({
      args: [
        '--use-fake-device-for-media-stream',
        '--use-fake-ui-for-media-stream'
      ]
    });
    console.info(`proxying '/chromium' to '${server.wsEndpoint()}'`)

    const proxy = createProxy({
      target: server.wsEndpoint(),
      ws: true,
      ignorePath: true
    });

    // req.socket.on("close", () => {
    //   console.info("socket event: close");
    // });

    // req.socket.on("data", () => {
    //   console.info("socket event: data");
    // });

    // req.socket.on("drain", () => {
    //   console.info("socket event: drain");
    // });

    proxy.ws(req, req.socket, req.headers);

    // socket event: data
    // proxy event: close
    // socket event: close
    // ...so, close the server on proxy close, or socket close?
    proxy.on("close", () => {
      console.info("proxy event: close");
      console.info("closing playwright server");
      server.close()
    });
  });
};
