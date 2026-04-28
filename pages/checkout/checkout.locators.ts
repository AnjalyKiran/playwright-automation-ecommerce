export const checkoutLocators = {
  guestRadio: 'input[type="radio"][value="guest"]',

  continueButtonRole: "button" as const,
  continueButtonTitle: "continue",

  firstName: "#guestFrm_firstname",
  lastName: "#guestFrm_lastname",
  email: "#guestFrm_email",

  address1: "#guestFrm_address_1",
  city: "#guestFrm_city",
  postcode: "#guestFrm_postcode",

  country: "#guestFrm_country_id",
  state: "#guestFrm_zone_id",

  confirmButtonRole: "button" as const,
  confirmButtonTitle: "Confirm Order",
};
