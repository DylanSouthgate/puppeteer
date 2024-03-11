const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
      // Add argument to load extension
      `--disable-extensions-except=${process.env.PUPPETEER_EXTENSIONS}`,
      `--load-extension=${process.env.PUPPETEER_EXTENSIONS}`
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });
    
    let link = "https://www.watchasian.sk/running-man-2010-episode-695.html";
    await page.goto(link,{ timeout: 30000, waitUntil: 'networkidle2' });

    await page.waitForSelector('.watch_video > iframe');
    console.log('Selector found: .watch_video > iframe');
    await page.click('.watch_video > iframe');
    console.log('Selector clicked');

    const htmlContent = await page.content();
    
    console.log(htmlContent);
    res.send(htmlContent);
  } catch (e) {
    console.error(e);
    res.status(500).send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
