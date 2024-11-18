test('User can log in', async ({ page }) => {  
    await page.goto('http://localhost:3000/login');  
    await page.fill('input[name="username"]', 'admin');  
    await page.fill('input[name="password"]', '123');  
    await page.click('button[type="submit"]');  
    await page.goto('http://localhost:3000/blogs');
});