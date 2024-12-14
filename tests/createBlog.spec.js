import { test, expect } from '@playwright/test';
const { test, expect } = require('@playwright/test');

test('Create a new blog', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'Password12');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('http://localhost:3000/blogs');
    await page.fill('input[name="title"]', 'Test Title');
    await page.fill('textarea[name="body"]', 'Test Body');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Test Title')).toBeVisible();
});