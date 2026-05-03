
import { test } from '../../fixtures/baseTest';

test.describe('Checkout - Critical Path', () => {
  test.beforeEach(async ({ home }) => {
    await home.navigate();
  });

  test('Guest can add product, checkout, and see success', async ({  home,
    product,
    cart,
    checkout,
    success, }) => {
    test.info().annotations.push({
      type: 'e2e',
      description: 'critical-path',
    });

    await home.openFirstProductFromHome();
    await product.addToCart();
    await cart.verifyCartLoaded();
    await cart.clickCheckout();
    await checkout.chooseGuestAndContinueIfShown();
    await checkout.fillGuestDetails();
    await checkout.continueToConfirm();
    await checkout.confirmOrder();
    await success.verifyOrderSuccess();
  });
});
