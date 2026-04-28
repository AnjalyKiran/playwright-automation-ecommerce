export const registerLocators = {
  // Inputs
  firstName: "#AccountFrm_firstname",
  lastName: "#AccountFrm_lastname",
  email: "#AccountFrm_email",
  loginName: "#AccountFrm_loginname",
  password: "#AccountFrm_password",
  confirmPassword: "#AccountFrm_confirm",

  address1: "#AccountFrm_address_1",
  city: "#AccountFrm_city",
  postcode: "#AccountFrm_postcode",

  country: "#AccountFrm_country_id",
  state: "#AccountFrm_zone_id",

  agreeCheckbox: "#AccountFrm_agree",

  continueButtonTitle: "continue",
  continueButtonRole: "button" as const,

  successHeading: {
    role: "heading" as const,
    name: /My Account/i
  },

  successMessage: /your account has been created/i,

 emailFormatError:
  "div.form-group.has-error:has(label:text('E-Mail:')) .help-block",

};
