import { env } from "process";

export const loginLocators = {
  username: "#loginFrm_loginname",
  password: "#loginFrm_password",

  loginButton: {
    Role: "button" as const,
    name: /login/i
  },

  accountHeading: {
   role: "heading" as const,
  level: 1 as const,
  name: /My Account/i 
  },

  logoutLink: {
    Role: "link" as const,
    name: /logoff/i
  }
};
