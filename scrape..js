const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const urls = [
    "https://sanand0.github.io/tdsdata/js_table/?seed=78",
    "https://sanand0.github.io/tdsdata/js_table/?seed=79",
    "https://sanand0.github.io/tdsdata/js_table/?seed=80",
    "https://sanand0.github.io/tdsdata/js_table/?seed=81",
    "https://sanand0.github.io/tdsdata/js_table/?seed=82",
    "https://sanand0.github.io/tdsdata/js_table/?seed=83",
    "https://sanand0.github.io/tdsdata/js_table/?seed=84",
    "https://sanand0.github.io/tdsdata/js_table/?seed=85",
    "https://sanand0.github.io/tdsdata/js_table/?seed=86",
    "https://sanand0.github.io/tdsdata/js_table/?seed=87"
  ];

  let grandTotal = 0;

  for (const url of urls) {
    await page.goto(url, { waitUntil: "networkidle" });

    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(td => td.innerText.trim())
        .filter(text => !isNaN(text) && text !== "")
        .map(Number)
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Sum for ${url}: ${pageSum}`);
    grandTotal += pageSum;
  }

  console.log("=================================");
  console.log("FINAL TOTAL:", grandTotal);
  console.log("=================================");

  await browser.close();
})();