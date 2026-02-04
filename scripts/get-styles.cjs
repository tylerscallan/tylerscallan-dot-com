const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://tylerscallan.com/about');
  await page.waitForTimeout(3000);

  // Get all text elements in the main content area
  const styles = await page.evaluate(() => {
    const results = [];

    // Find all paragraph and heading elements in the content
    const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');

    elements.forEach((el, index) => {
      const text = el.textContent.trim().substring(0, 50);
      if (text && (text.includes('Currently') || text.includes('Tyler Callan') || text.includes('professional'))) {
        const computed = window.getComputedStyle(el);
        results.push({
          text: text,
          tagName: el.tagName,
          fontSize: computed.fontSize,
          fontWeight: computed.fontWeight,
          fontFamily: computed.fontFamily,
          lineHeight: computed.lineHeight,
          letterSpacing: computed.letterSpacing,
          marginTop: computed.marginTop,
          marginBottom: computed.marginBottom,
          color: computed.color
        });
      }
    });

    return results;
  });

  console.log(JSON.stringify(styles, null, 2));

  await browser.close();
})();
