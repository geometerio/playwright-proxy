import * as express    from "express";
import * as playwright from "playwright";

let nextPort = 8042;

export const register = (app: express.Application) => {
  app.get("/api/connect", async (req: any, res) => {
    try {
      const server = await playwright.chromium.launchServer({
        port: nextPort
      });
      const endpoint = server.wsEndpoint();
      nextPort += 1;

      // tslint:disable-next-line:no-console
      console.info(`--> providing new connection at ${endpoint}`);

      res.setHeader('Content-Type', 'application/json');
      res.json({ endpoint });

      // server.close();
    } catch (error) {
      // ...
    }
  });

  app.get("/api/status", async (req: any, res) => {
    try {
      return res.json({
        status: "OK"
      });
    } catch(e) {
      // tslint:disable-next-line:no-console
      console.error(e);
      res.json({
        error: e.message || e
      });
    }
  });
};
