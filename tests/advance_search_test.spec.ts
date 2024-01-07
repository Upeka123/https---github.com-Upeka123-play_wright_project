/* The script initiates directly on the registration page due to a Cloudflare-related issue preventing access to the website's homepage.
 It proceeds to simulate the user's registration process by entering personal data, selecting preferences, and acknowledging terms.
Additionally, it tackles reCAPTCHA, if present, before clicking the 'REGISTER' button to start the registration. The script then pauses,
 allowing a review of the process's execution up to that point.*/

import { test, expect } from '@playwright/test';

test('Advance search using valid details', async ({ page }) => {
  //Navigate to the Advance search page
  await page.goto('https://onlinelibrary.wiley.com/search/advanced#');
  // Select the 'Title' option in the context search area
  await page.locator('#searchArea1').selectOption('Title');
  // Click on the Term field for entering the text
  await page.locator('#text1').click();
  // Fill in the specific text in the input field
  await page.locator('#text1').fill('Bio‐ and Multifunctional Polymer Architectures: Preparation, Analytical Methods, and Applications');
  // Click on the placeholder for entering a journal, book, or...
  await page.getByPlaceholder('Enter a journal, book, or').click();
  // Fill in the specific text in the journal/book input field
  await page.getByPlaceholder('Enter a journal, book, or').fill(' Bio‐ and Multifunctional Polymer Architectures ');
  // Click on the option for filtering by date ('All Dates' dropdown)
  await page.getByText('All Dates').click();
  await page.getByText('All Dates').click();


  // Click on the 'Search' button
  await page.getByRole('button', { name: 'Search', exact: true }).click();

  await page.pause()

})