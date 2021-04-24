import * as express    from "express";
import * as playwright from "playwright";
import { createProxy } from "http-proxy";

export const register = (app: express.Application) => {
  // NOTE:
  //
  // Each websocket request to `/xyz` spins up its own new playwright
  // BrowserServer. This might actually be desired, in the interest of test
  // isolation. Or, perhaps we want to maintain a pool for the sake of speed
  // and resource constraints.
  //
  // In any event, the next step is to ensure that these servers are closed
  // after the test run.
  app.get("/chromium", async (req: any, res) => {
    const server = await playwright.chromium.launchServer();
    console.info(`proxying '/chromium' to '${server.wsEndpoint()}'`)

    const proxy = createProxy({
      target: server.wsEndpoint(),
      ws: true,
      ignorePath: true
    });

    proxy.ws(req, req.socket, req.headers);

    // server.close();
  });
};
