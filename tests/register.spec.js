import { test, expect } from '@playwright/test';
const { test, expect } = require('@playwright/test');

test('User can register.', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="first_name"]', 'testFName');
    await page.fill('input[name="last_name"]', 'testLName');
    await page.fill('input[name="username"]', 'testUserNAME');
    await page.fill('input[name="email"]', 'test@test.com');
    await page.fill('input[name="password"]', 'Password12');
    await page.fill('input[name="passwordTwo"]', 'Password12');

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('http://localhost:3000/login');
});