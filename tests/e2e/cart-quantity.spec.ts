import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';

test.describe('Cart quantity scenarios', () => {
  let homePage: HomePage;
  let productPage: ProductPage;
  let cartPage: CartPage;

 test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);

    await homePage.navigate();
    await homePage.openFirstProductFromHome();
    await productPage.addToCart();
  });

   test('User can update product quantity in cart', async () => {
    await cartPage.updateQuantity('2');
    await cartPage.verifyQuantity('2');
  });

  test('Cart becomes empty when quantity is 0', async () => {
    await cartPage.updateQuantity('0');
    await cartPage.verifyCartIsEmpty();
  });

  test('Cart becomes empty when quantity is empty', async () => {
    await cartPage.updateQuantity('');
    await cartPage.verifyCartIsEmpty();
  });
});