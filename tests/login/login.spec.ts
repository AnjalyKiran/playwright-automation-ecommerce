import { test } from "@playwright/test";
import { LoginActions } from "../../pages/login/login.actions";
import { Env } from "../../config/env.config";

test.describe("Login Tests", () => {
  let login: LoginActions;

  test.beforeEach(async ({ page }) => {
    login = new LoginActions(page);
    await login.navigate();
  });

  // Positive Scenario
  test("Valid Login", async () => {
    await login.login(Env.loginUser.username, Env.loginUser.password);
    await login.verifySuccessfulLogin();
  });

  // Negative Scenario
  test("Invalid Login: User should see error message", async () => {
    await login.login(Env.loginUser.username, "WrongPassword123");
    await login.verifyErrorMessage("Error: Incorrect login or password provided.");
  });
});



