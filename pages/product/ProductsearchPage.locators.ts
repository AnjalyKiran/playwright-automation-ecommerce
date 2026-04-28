export const searchLocators = {
  searchTextbox: {
    role: "textbox" as const,
    name: /search keywords/i
  },

  productTitle: "span.bgnone",

  noResultsMessage: /There is no product that matches/i
};
