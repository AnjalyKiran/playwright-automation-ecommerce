import { test } from "@playwright/test";

import { HomeActions } from "../../pages/home/home.actions";
import { ProductActions } from "../../pages/product/product.actions";
import { CartActions } from "../../pages/cart/cart.actions";

test.describe("Cart quantity scenarios", () => {
  let home: HomeActions;
  let product: ProductActions;
  let cart: CartActions;

  test.beforeEach(async ({ page }) => {
    home = new HomeActions(page);
    product = new ProductActions(page);
    cart = new CartActions(page);

    await home.navigate();
    await home.openFirstProductFromHome();
    await product.addToCart();
  });

  test("User can update product quantity in cart", async () => {
    await cart.updateQuantity("2");
    await cart.verifyQuantity("2");
  });

  test("Cart becomes empty when quantity is 0", async () => {
    await cart.updateQuantity("0");
    await cart.verifyCartIsEmpty();
  });

  test("Cart becomes empty when quantity is empty", async () => {
    await cart.updateQuantity("");
    await cart.verifyCartIsEmpty();
  });
});

