const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (req,res) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
    const page = await browser.newPage();

//    await page.goto("https://watchasia.to/drama-detail/wedding-impossible");
    let m3u8 = '';

    page.on("request", req =>
    {
      if (req.url().endsWith(".m3u8"))
      {
          m3u8 = req.url();
          console.log(m3u8);
      }
    })

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });
    try {

  let link = "https://www.watchasian.sk" + req.query.videoId;
        await page.goto(link,{timeout: 0,waitUntil: 'networkidle2'});
        await page.waitForSelector('.watch_video > iframe');
        await page.click('.watch_video > iframe');

        // Locate the full title with a unique string
  const textSelector = await page.waitForSelector(
    '.info > h1'
  );
  const fullTitle = await textSelector?.evaluate(el => el.textContent);

    // Print the full title
    const logStatement = `The title of this blog post is ${fullTitle}`;
    console.log(logStatement);
    res.send(logStatement);
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
