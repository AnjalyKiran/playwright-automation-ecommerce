import { test as base } from "@playwright/test";
import { HomeActions } from "../pages/home/home.actions";
import { ProductActions } from "../pages/product/product.actions";
import { CartActions } from "../pages/cart/cart.actions";
import { LoginActions } from "../pages/login/login.actions";
import { RegisterActions } from "../pages/register/register.actions";
import { CheckoutActions } from "../pages/checkout/checkout.actions";
import { SuccessActions } from "../pages/success/success.actions";

type Pages = {
  home: HomeActions;
  product: ProductActions;
  cart: CartActions;
  login: LoginActions;
  register: RegisterActions;
  checkout: CheckoutActions;
  success: SuccessActions;
};

export const test = base.extend<Pages>({
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
  },

  register: async ({ page }, use) => {
    await use(new RegisterActions(page));
  },

  checkout: async ({ page }, use) => {
    await use(new CheckoutActions(page));
  },

  success: async ({ page }, use) => {
    await use(new SuccessActions(page));
  },
});

export { expect } from "@playwright/test";
