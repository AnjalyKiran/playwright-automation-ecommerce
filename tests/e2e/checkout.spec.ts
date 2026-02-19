import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { SuccessPage } from '../../pages/SuccessPage';

test.describe('Checkout - Critical Path', () => {
  let home: HomePage;
  let product: ProductPage;
  let cart: CartPage;
  let checkout: CheckoutPage;
  let success: SuccessPage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    product = new ProductPage(page);
    cart = new CartPage(page);
    checkout = new CheckoutPage(page);
    success = new SuccessPage(page);
  });

  test('Guest can add product, checkout, and see success', async ({ page }) => {
    test.info().annotations.push({ type: 'e2e', description: 'critical-path' });

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

