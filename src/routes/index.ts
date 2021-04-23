import * as express from "express";
import * as api from "./api"
import * as web from "./web"

export const register = (app: express.Application) => {
  api.register(app);
  web.register(app);
};
