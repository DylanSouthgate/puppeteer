const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    defaultViewport: null,
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
      `--load-extension=${process.env.PUPPETEER_EXTENSIONS}`, // Include loaded extension
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();

    page.setRequestInterception(true);
        page.on("request", req => {
            if (req.url().endsWith(".m3u8"))
            {
                console.log(req.url());
                res.send(req.url());
                page.close();
            }
            if (req.url().endsWith(".png") || req.url().endsWith(".jpg") || req.url().endsWith(".css"))
            {
                req.abort();
            }
            else{
                req.continue();
            }
        })

    let link = "https://www.watchasian.sk/running-man-2010-episode-695.html";
    await page.goto(link,{timeout: 0,waitUntil: 'networkidle2'});
    await page.waitForSelector('.watch_video > iframe');
    await page.click('.watch_video > iframe');
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
