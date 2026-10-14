import { test, expect } from "@playwright/test";

test("add product to Cart", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await expect(page).toHaveTitle("Swag Labs");

  const loginField = page.getByTestId("username");

  await loginField.fill("standard_user");

  await page.getByPlaceholder("Password").fill("secret_sauce");

  await page.getByRole("button", { name: "login" }).click();

  await expect(page).toHaveURL(/inventory/);

  await expect(page.getByTestId("inventory-item")).toHaveCount(6);

  const testProductBackpack = page
    .getByTestId("inventory-item-description")
    .filter({ hasText: "Sauce Labs Backpack" });

  const testProductAddButton = testProductBackpack.getByRole("button", {
    name: "Add to cart",
  });

  await testProductAddButton.click();

  await expect(page.getByTestId("shopping-cart-badge")).toHaveText("1");

  const testProductRemoveButton = testProductBackpack.getByRole("button", {
    name: "Remove",
  });

  await expect(testProductRemoveButton).toBeVisible();
});
