
import * as dotenv from "dotenv";
dotenv.config();

export const Env = {
  baseUrl: process.env.BASE_URL ?? "https://automationteststore.com",

  loginUser: {
    username: process.env.USER_NAME ?? "",
    password: process.env.PASSWORD ?? "",
  },

  testUser: {
    email: process.env.TEST_EMAIL ?? "",
    password: process.env.TEST_PASSWORD ?? "",
  }
};
