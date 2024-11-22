const { test, expect } = require('@playwright/test');

test('User can log in', async ({ page }) => {  
    await page.goto('http://localhost:3000/login');  
    await page.fill('input[name="username"]', 'admin');  
    await page.fill('input[name="password"]', 'Password12');  
    await page.click('button[type="submit"]');  

    await expect(page).toHaveURL('http://localhost:3000/blogs');
});