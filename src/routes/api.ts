import * as express    from "express";
import * as playwright from "playwright";

export const register = (app: express.Application) => {
  app.get("/api/browse", async (req: any, res) => {
    try {
      (async () => {
        // const options = {
        //   headless: false,
        //   slowMo: 10000
        // };
        // const browser = await playwright.chromium.launch(options);
        const browser = await playwright.chromium.launch();

        const page    = await browser.newPage();
        const domain  = "google.com";

        await page.goto(`https://${domain}`);
        await page.screenshot({
          path: `doc/${domain}.png`
        });

        await browser.close();
      })();

      res.setHeader('Content-Type', 'application/json');
      res.json({ x: "OK" });
    } catch (e) {
      // handle errors
    }
  });

  app.get("/api/server", async (req: any, res) => {
    try {
      (async () => {
        const server   = await playwright.chromium.launchServer();
        const wsEndpoint = server.wsEndpoint();

        // tslint:disable-next-line:no-console
        console.info(`endpoint: ${wsEndpoint}`);

        // tslint:disable-next-line:no-console
        console.info("wait for it...");
        await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2s, for effect.

        // tslint:disable-next-line:no-console
        console.info("update `basic.spec.ts` in the `geo-player` project with that WS endpoint and `npm run spec`");
      })();

      // res.setHeader('Content-Type', 'application/json');
      // res.json({ x: "OK" });
    } catch (e) {
      // handle errors
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
