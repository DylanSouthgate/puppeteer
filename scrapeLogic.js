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
      `--load-extension=${process.env.PUPPETEER_EXTENSIONS}`,
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();

    // Check if the extension is loaded
    const extensions = await page.evaluate(() => {
      return new Promise(resolve => {
        chrome.management.getAll(extensions => {
          resolve(extensions.map(ext => ext.name));
        });
      });
    });
    console.log("Loaded extensions:", extensions);
    res.send(extensions);
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };