import { test } from '../../fixtures/baseTest';

test.describe('Cart quantity scenarios', () => {
  test.beforeEach(async ({ home, product }) => {
    await home.navigate();
    await home.openFirstProductFromHome();
    await product.addToCart();
  });

  test('User can update product quantity in cart', async ({ cart }) => {
    await cart.updateQuantity('2');
    await cart.verifyQuantity('2');
  });

  test('Cart becomes empty when quantity is 0', async ({ cart }) => {
    await cart.updateQuantity('0');
    await cart.verifyCartIsEmpty();
  });

  test('Cart becomes empty when quantity is empty', async ({ cart }) => {
    await cart.updateQuantity('');
    await cart.verifyCartIsEmpty();
  });
});
