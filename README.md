# An Exploration: Proxy to Playwright in Containers

This is in some form of "working" state, in which Playwright may be run within containers, whether Docker or Kubernetes (tested locally with Minikube).

## Usage

### Deploying Playwright

TODO :)

For hints, take a look at:

- [./Dockerfile] (Docker)
- [./etc/deployment.yaml] (Kubernetes)

### Writing Tests

Something like...

```typescript
import * as axios from "axios";
import * as playwright from "playwright";

describe('taking a bunch of website screenshots in parallel', () => {
  it('works', async () => {
    try {
      await Promise.all([
        test("apple.com"),
        test("github.com"),
        test("google.com"),
        test("microsoft.com")
      ]);
    } catch (e) {
      console.error("FAIL!!!");
      throw(e);
    }
  });
});

// ---

async function test(target: string) {
  await axios.default.get('http://localhost:8080/api/connect/chromium')
    .then(async (res) => {
      console.info(`connecting to '${res.data.endpoint}' for target: '${target}'`);

      const endpoint = res.data.endpoint;
      const browser  = await playwright.chromium.connect({ wsEndpoint: endpoint });
      const page     = await browser.newPage();

      await page.goto(`https://${target}`);
      await page.screenshot({
        path: `doc/${target}.png`
      });

      await browser.close();
```
  });
};
