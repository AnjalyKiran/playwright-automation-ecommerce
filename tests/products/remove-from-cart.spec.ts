
import { test } from '../../fixtures/baseTest';

test.describe('Remove product from cart', () => {
  test.beforeEach(async ({ home, product }) => {
    await home.navigate();
    await home.openFirstProductFromHome();
    await product.addToCart();
  });

  test('Remove single item → cart empty', async ({ cart }) => {
    await cart.removeProductFromCart();
    await cart.verifyCartIsEmpty();
  });

  test('Remove one item from multiple items', async ({ home, product, cart }) => {
    // add second product
    await home.openProductByIndex(1);
    await product.addToCart();

    await cart.verifyCartItemCount(2);

    await cart.removeProductByIndex(0);

    await cart.verifyCartItemCount(1);
  });

  test('Product B remains in cart after removing Product A', async ({ home, product, cart }) => {
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
