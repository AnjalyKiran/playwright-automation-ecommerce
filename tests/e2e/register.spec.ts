import { test } from "@playwright/test";
import { RegisterActions } from "../../pages/register/register.actions";
import { registerNewUser } from "../../utils/testData";

test.describe("Register (Create Account)", () => {
  let register: RegisterActions;

  test.beforeEach(async ({ page }) => {
    register = new RegisterActions(page);
    await register.navigate();
  });

  test("User can create account", async () => {
    const user = registerNewUser();

    await register.register(user);
    await register.registrationSuccess();
  });

  test("Invalid email format", async () => {
    const user = registerNewUser();

    await register.fillBasicDetails(user);
    await register.fillInvalidEmail(); // updated method name
    await register.fillPasswordFields(user.password); // updated method name
    await register.fillAddressDetails(user);
    await register.acceptPrivacyPolicyIfPresent();
    await register.submit();

    await register.expectEmailError(); // updated method name
  });

  test("Password Mismatch", async () => {
    const user = registerNewUser();

    await register.fillBasicDetails(user);
    await register.fillEmailDetails(user);
    await register.fillPasswordMissmatchFields("WrongPassword"); // mismatch
    await register.fillAddressDetails(user);
    await register.acceptPrivacyPolicyIfPresent();
    await register.submit();

    await register.expectPasswordMismatchError();
  });
});
