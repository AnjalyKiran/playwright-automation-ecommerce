import { Env } from "../config/env.config";

export const users = {
  standard: {
    username: Env.loginUser.username,
    password: Env.loginUser.password,
  },

  registeredUser: {
    email: Env.testUser.email,
    password: Env.testUser.password,
  },

  invalid: {
    username: "invalid_user",
    password: "wrong_password",
  }
};
