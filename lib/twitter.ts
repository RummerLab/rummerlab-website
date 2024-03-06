const puppeteer = require('puppeteer');

const username = process.env.TWITTER_USERNAME;
const password = process.env.TWITTER_PASSWORD;

// TODO save cookies

(async () => {
  // Launch the browser.
  const options = {
    headless: false,
    executablePath: '',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  };
  if (process.env.NODE_ENV === 'production') {//VERCEL_ENV
    options.headless = true;
    options.executablePath = '/usr/bin/chromium-browser';
    options.args = ['--no-sandbox', '--disable-setuid-sandbox'];
  }
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();

  // Adjusting width and height of the viewport
  await page.setViewport({ width: 1200, height: 600 });

  await page.goto('https://twitter.com/i/flow/login', { waitUntil: 'networkidle0' });

  await page.type('#layers input', username, { delay: 50 });

  const [nextButton] = await page.$x("//div[contains(text(), 'Next') and @role='button']");
  if (nextButton) {
      await (nextButton as HTMLElement).click();
  } else {
    await page.evaluate(() => {
      const buttons = [...document.querySelectorAll('div[role="button"]')]; // Find all elements with a role of button
      const nextButton = buttons.find(button => button && button.textContent && button.textContent.includes('Next')); // Look for the button with "Next" text
      if (nextButton) {
          (nextButton as HTMLElement).click(); // Click the "Next" button if found
      } else {
          console.error('Next button not found');
      }
    });
  }

  await page.waitForSelector('#layers input', { visible: true });
  await page.type('#layers input', password, { delay: 50 });
  //await page.type('input[name="password"]', password, { delay: 50 });

  // Click the login button after password input. Adjust the selector if necessary.
  await page.click('[data-testid="LoginForm_Login_Button"]');
  //await page.click('div[data-testid="LoginForm_Login_Button"]');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  // Navigate to the user's profile
  await page.goto('https://twitter.com/physiologyfish', { waitUntil: 'networkidle2' });

  //await scroll down (or page down)
  await page.evaluate(() => {
    window.scrollBy(0, window.innerHeight);
  });

  // const tweetSelector = 'article[data-testid="tweet"]';
  const tweetSelector = 'article[testid="tweet"]';

  await page.waitForSelector(tweetSelector, { visible: true });

  // Wait for selector
  //const html_element = await page.$(tweetSelector);
  //https://scrapfly.io/blog/how-to-take-screenshot-with-puppeteer/


  // Wait for the tweets to be rendered
  await page.waitForSelector(tweetSelector, { visible: true });

  // Example: Extract and log the tweets' text content. Adjust the selector based on Twitter's layout.
  const tweets = await page.evaluate((selector: string) => {
    const tweetNodes = document.querySelectorAll(selector);
    return Array.from(tweetNodes).map(node => node.textContent);
  }, tweetSelector);  

  console.log(tweets);

  // Close the browser
  await browser.close();
})();
