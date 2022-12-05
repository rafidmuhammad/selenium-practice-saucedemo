const { Builder, By } = require("selenium-webdriver");

require("chromedriver");

describe("Add to cart", () => {
  let browser;

  beforeAll(async () => {
    browser = await new Builder().forBrowser("chrome").build();
    browser.get("https://www.saucedemo.com/");

    const usernameField = await browser.findElement(By.id("user-name"));
    const passwordField = await browser.findElement(By.id("password"));
    const loginButton = await browser.findElement(By.id("login-button"));

    await usernameField.sendKeys("standard_user");
    await passwordField.sendKeys("secret_sauce");
    await loginButton.click();
  });

  afterAll(() => {
    browser.quit();
  });

  test.each([
    [
      {
        btn: "#add-to-cart-sauce-labs-backpack",
        prod: "#item_4_title_link > div",
        expected: "Sauce Labs Backpack",
      },
      {
        btn: "#add-to-cart-sauce-labs-bike-light",
        prod: "#item_0_title_link > div",
        expected: "Sauce Labs Bike Light",
      },
      {
        btn: "#add-to-cart-sauce-labs-bolt-t-shirt",
        prod: "#item_1_title_link > div",
        expected: "Sauce Labs Bolt T-Shirt",
      },
      {
        btn: "#add-to-cart-sauce-labs-fleece-jacket",
        prod: "#item_5_title_link > div",
        expected: "Sauce Labs Fleece Jacket",
      },
      {
        btn: "#add-to-cart-sauce-labs-Onesie",
        prod: "#item_2_title_link > div",
        expected: "Sauce Labs Onesie",
      },
      {
        btn: "#add-to-cart-test.allthethings()-t-shirt-(red)",
        prod: "#item_3_title_link > div",
        expected: "Test.allTheThings() T-Shirt (Red)",
      },
    ],
  ])(
    "Should add item to cart successfully",
    async ({ btn, prod, expected }) => {
      const addToCartBtn = await browser.findElement(By.css(btn));
      const cart = await browser.findElement(
        By.css("#shopping_cart_container")
      );
      await addToCartBtn.click();
      await cart.click();
      const pageTitle = await browser.findElement(
        By.css("#header_container > div.header_secondary_container > span")
      );
      const product = await browser.findElement(By.css(prod));
      expect(await pageTitle.getText()).toEqual("YOUR CART");
      expect(await product.getText()).toEqual(expected);
    }
  );
});
