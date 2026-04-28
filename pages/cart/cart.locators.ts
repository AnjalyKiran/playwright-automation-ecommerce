export const cartLocators = {
  quantityInput: 'input[name*="quantity[50]"]',
  updateButton: { role: "button" as const, name: /update/i },

  emptyCartMessage: /Your shopping cart is empty!/i,

  removeButton: 'a[title="Remove"], .fa-trash-o',

  cartTableRow: 'table.table-striped.table-bordered tbody tr',
  productNameCell: 'td:nth-child(2) a',

  checkoutButton: 'a#cart_checkout2[title="Checkout"]',

  cartHeading: {
    role: "heading" as const,
    name: /shopping cart/i,
  },

  cartTable: 'table.table.table-striped.table-bordered'
};

