import * as express    from "express";
import * as playwright from "playwright";

export const register = (app: express.Application) => {
  app.get("/api/browse", async (req: any, res) => {
    try {
      (async () => {
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
