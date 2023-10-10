const puppeteer = require('puppeteer');
const path = require('path'); // Node.js path module for working with file paths

describe('Sign-In Page Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();

    // Load the local HTML file (replace 'local-file.html' with your file path)
    const filePath = path.resolve(__dirname, 'sign_in.html');
    await page.goto(`file://${filePath}`);
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should have a title containing "Sign-In"', async () => {
    const title = await page.title();
    expect(title).toContain('Signin');
  });

  // Add more test cases as needed
  it('should display an error message for invalid email during sign-up', async () => {
    // Fill in the form with an invalid email and submit
    await page.type('input[name="sign-up-email"]', 'invalid-email');
    await page.click('form[name="sign-up-form"] button');
    await page.waitForSelector('.error');

    // Check if the error message is displayed
    const errorMessage = await page.$eval('.error', (element) => element.textContent);
    expect(errorMessage).toContain('Invalid email format');
  });

  it('should display an error message for a weak password during sign-up', async () => {
    // Fill in the form with a weak password and submit
    await page.type('input[name="sign-up-passwd"]', '123');
    await page.click('form[name="sign-up-form"] button');
    await page.waitForSelector('.error');

    // Check if the error message is displayed
    const errorMessage = await page.$eval('.error', (element) => element.textContent);
    expect(errorMessage).toContain('Password is too weak');
  });

  it('should display error messages for empty fields during sign-up', async () => {
    // Leave one or more required fields empty and submit
    await page.click('form[name="sign-up-form"] button');
    await page.waitForSelector('.error');

    // Check if error messages are displayed for empty fields
    const errorMessages = await page.$$eval(as-alert-box-button, (elements) => elements.map((element) => element.textContent));
    expect(errorMessages).toContain(/* Add the expected error message for empty fields */);
  });

});