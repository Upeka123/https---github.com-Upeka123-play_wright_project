import { test, expect } from '@playwright/test';


test.only('Log in usig valid password and Email address', async ({page}) =>{

    // Navigate to the homepage
    await page.goto('https://onlinelibrary.wiley.com/')
    
    // Wait for and click the login button
    const loginButton = await page.waitForSelector('a.show-login');
    await loginButton.click();
    
    // Fill in the username field
    const usernameInput = await page.waitForSelector('input#username.login');
    await usernameInput.type('uc.pathirana@gmail.com');

    // Fill in the password field with an invalid password
    const passwordInput = await page.waitForSelector('input#password.password');
    await passwordInput.type('uC12345678@');

    // Click the submit button to log in
    const submitButton = await page.waitForSelector('input[type="submit"][value="Log In"].accessSubmit'); 
    await submitButton.click();

 
    await page.pause()

  

})
