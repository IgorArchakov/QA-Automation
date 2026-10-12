import { test, expect } from '@playwright/test';

test('login to sauce', async ({ page }) =>{
    await page.goto('https://www.saucedemo.com/');

    await expect(page).toHaveTitle('Swag Labs');

    const LoginField = page.getByPlaceholder('Username');
    
    await LoginField.fill('standard_user');

    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', {name: 'login'}).click();
    
    await expect(page).toHaveURL(/inventory1/)
    }
)