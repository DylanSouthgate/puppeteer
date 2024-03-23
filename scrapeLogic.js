const puppeteer = require("puppeteer");
const fs = require("fs");
require("dotenv").config();

const scrapeLogic = async (res) => {
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

    try {
        let link = "https://watchasia.to/flex-x-cop-2024-episode-10.html"; // Change this to the desired URL
        await page.goto(link);

        // Get the HTML content of the page
        const htmlContent = await page.content();

        // Write the HTML content to a file
        fs.writeFileSync("output.html", htmlContent);

        console.log("HTML content saved to output.html");
    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
};

module.exports = { scrapeLogic };
