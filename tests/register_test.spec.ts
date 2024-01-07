/* The script initiates directly on the registration page due to a Cloudflare-related issue preventing access to the website's homepage.
 It proceeds to simulate the user's registration process by entering personal data, selecting preferences, and acknowledging terms.
Additionally, it tackles reCAPTCHA, if present, before clicking the 'REGISTER' button to start the registration. The script then pauses,
 allowing a review of the process's execution up to that point.*/

import { test, expect } from '@playwright/test';

test.only('register using valid data', async ({page}) =>{
    // Navigate to the registration page
    await page.goto('https://onlinelibrary.wiley.com/action/registration?acdl-redirect=true')

    // Fill in the email and confirm email fields
    await page.fill('input[id="login.email"]', 'upeka@institution.edu');
    await page.fill('input.email2', 'upeka@institution.edu');
    // Fill in the password and confirm password fields
    await page.fill('input.pass-hint', 'UpekaPassword123');
    await page.fill('input[name="login.password2"]', 'UpekaPassword123');
    // Fill in personal information
    await page.fill('input[name="personal.givenNames"]', 'Upeka');
    await page.fill('input[name="personal.surname"]', 'Pathirana');
    // Select country and area of interest
    await page.selectOption('select[name="taxonomy[0].values"]', 'country-lk');
    await page.selectOption('select[name="taxonomy[1].values"]', { value: 'biology' });
    // Click on the checkbox for subscribing
    const spanSelector = '.label-txt:has-text("Yes"), .label-txt:has-text("Yes, please sign me up")';
    const spanElement = await page.waitForSelector(spanSelector);
    await spanElement.click();
    // Click on the checkbox for accepting terms and conditions
    const aspanSelector = '.label-txt:has-text("I have read and accept the Wiley Online Library Terms & Conditions of Use")';
    const aspanElement = await page.waitForSelector(aspanSelector);
    await aspanElement.click();
    const page1Promise = page.waitForEvent('popup');
    // Handle reCAPTCHA
    await page.getByText('I have read and accept the').click();
    const page1 = await page1Promise;
    const frame = page.frames().find(frame => frame.url().includes('recaptcha'));
    if (frame) {
        const checkboxSelector = '[aria-labelledby="recaptcha-anchor-label"]'; // Selector for the checkbox
        await frame.waitForSelector(checkboxSelector);
        await frame.click(checkboxSelector);
  } else {
        console.log('reCAPTCHA frame not found.');
  }
    // Click on the REGISTER button
    await page.getByRole('button', { name: 'REGISTER', exact: true }).click();
    // Pause the test execution for inspection
    await page.pause()



})