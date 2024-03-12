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
    
    let link = "https://www.watchasian.sk/running-man-2010-episode-695.html";
    await page.goto(link);

    const screenshot = await page.screenshot({ fullPage: true });
    res.set('Content-Type', 'image/png');
    res.send(screenshot);
  } catch (e) {
    console.error(e);
    res.status(500).send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
