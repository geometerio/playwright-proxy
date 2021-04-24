import * as express    from "express";

export const register = (app: express.Application) => {
  app.get("/api/connect/chromium", async (req: any, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({ endpoint: 'ws://localhost:8081/chromium' });
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
