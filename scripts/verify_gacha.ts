import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function verifyGacha() {
  const browser = await chromium.launch({
    headless: true, // Run headlessly
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('Navigating to login...');
    await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle' });

    // Login
    console.log('Logging in...');
    await page.fill('input[placeholder="Enter your ID"]', 'Hero');
    await page.fill('input[placeholder="Enter your password"]', 'pass');
    await page.click('button:has-text("Login")');

    await page.waitForURL('http://localhost:5173/');
    console.log('Dashboard loaded.');

    // Go to Weapon Gacha
    console.log('Entering Weapon Gacha...');
    await page.click('a[href="/gacha/weapon"]');
    await page.waitForURL('http://localhost:5173/gacha/weapon');

    // Click Summon
    console.log('Clicking Summon...');
    // Finding the button that contains "Summon" and "100 G"
    // Using a more robust selector or text match
    const summonButton = page.locator('button', { hasText: 'Summon (100 G)' });
    await summonButton.click();

    console.log('Waiting for animation...');
    // Wait for the result to appear (approx 3s + buffer)
    // We look for the result modal or specific rarity text
    await page.waitForTimeout(4000);

    console.log('Capturing result...');
    await page.screenshot({ path: path.join(__dirname, 'gacha_result_final.png'), fullPage: true });
    console.log('Screenshot saved to scripts/gacha_result_final.png');

  } catch (error) {
    console.error('Error during verification:', error);
  } finally {
    await browser.close();
  }
}

verifyGacha();
