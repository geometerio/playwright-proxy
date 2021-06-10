import * as express from "express";

export const register = (app : express.Application) => {
  app.get("/api/connect/chromium", async (req : any, res) => {
    console.info(req.body);
    console.info(req.params);
    console.info(req.path);
    console.info(req.query);
    console.info(req.xhr);

    res.setHeader('Content-Type', 'application/json');
    res.json({endpoint: `ws://localhost:${
        process.env.WEBSOCKET_PORT
      }/chromium`});
  });

  app.get("/api/status", async (req : any, res) => {
    try {
      return res.json({status: "OK"});
    } catch (e) { // tslint:disable-next-line:no-console
      console.error(e);
      res.json({
        error: e.message || e
      });
    }
  });
};
