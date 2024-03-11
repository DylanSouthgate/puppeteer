const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
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

    await page.goto("https://www.watchasian.sk/running-man-2010-episode-695.html");

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    await page.goto(link,{timeout: 0,waitUntil: 'networkidle2'});
    await page.waitForSelector('.watch_video > iframe');
    await page.click('.watch_video > iframe');
    let title = "";
    await page.waitForSelector('.m3u8')
    .then(() => console.log("found it"));
    title = await page.$eval('.m3u8', el => el.innerText);
    page.close();
    res.send(title);
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
