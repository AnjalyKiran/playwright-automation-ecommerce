import { test as base } from "@playwright/test";
import { HomeActions } from "../pages/home/home.actions";
import { ProductActions } from "../pages/product/product.actions";
import { CartActions } from "../pages/cart/cart.actions";
import { LoginActions } from "../pages/login/login.actions";

type Fixtures = {
  home: HomeActions;
  product: ProductActions;
  cart: CartActions;
  login: LoginActions;
};

export const test = base.extend<Fixtures>({
  home: async ({ page }, use) => {
    await use(new HomeActions(page));
  },
  product: async ({ page }, use) => {
    await use(new ProductActions(page));
  },
  cart: async ({ page }, use) => {
    await use(new CartActions(page));
  },
  login: async ({ page }, use) => {
    await use(new LoginActions(page));
  }
});

export const expect = test.expect;
