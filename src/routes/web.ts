import * as express from "express";

export const register = (app: express.Application) => {
  app.get("/", (req: any, res) => {
    res.render("index");
  });
};
