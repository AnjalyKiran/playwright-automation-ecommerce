import { test } from "@playwright/test";

import { HomeActions } from "../../pages/home/home.actions";
import { ProductActions } from "../../pages/product/product.actions";
import { CartActions } from "../../pages/cart/cart.actions";

test.describe("Remove product from cart", () => {
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

  test("Remove single item → cart empty", async () => {
    await cart.removeProductFromCart();
    await cart.verifyCartIsEmpty();
  });

  test("Remove one item from multiple items", async () => {
    // add second product
    await home.openProductByIndex(1);
    await product.addToCart();

    await cart.verifyCartItemCount(2);

    await cart.removeProductByIndex(0);

    await cart.verifyCartItemCount(1);
  });

  test("Product B remains in cart after removing Product A", async () => {
    await home.openProductByIndex(1);
    await product.addToCart();

    const productA = await cart.getProductNameByIndex(0);
    const productB = await cart.getProductNameByIndex(1);

    await cart.verifyCartItemCount(2);

    await cart.removeProductByIndex(0);

    await cart.verifyCartItemCount(1);

    await cart.verifyProductIsNotInCart(productA);
    await cart.verifyProductIsInCart(productB);
  });
});
