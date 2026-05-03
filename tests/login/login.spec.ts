import { test, expect } from '../../fixtures/baseTest';
import { Env } from '../../config/env.config';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ login }) => {
    await login.navigate();
  });

  // Positive Scenario
  test('Valid Login', async ({ login }) => {
    await login.login(Env.loginUser.username, Env.loginUser.password);
    await login.verifySuccessfulLogin();
  });

  // Negative Scenario
  test('Invalid Login: User should see error message', async ({ login }) => {
    await login.login(Env.loginUser.username, 'WrongPassword123');
    await login.verifyErrorMessage('Error: Incorrect login or password provided.');
  });
});
