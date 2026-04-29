# Playwright Automation E-commerce Project

This project is an end-to-end automation framework for an e-commerce website using **Playwright**, **TypeScript**, and the **Page Object Model** design pattern.

The framework covers important user flows such as registration, login, product search, cart management, and checkout.

---

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Page Object Model
- GitHub Actions
- Dotenv for environment configuration

---

## Test Scenarios Covered

- User registration
- Valid and invalid login
- Product search
- No search result validation
- Add product to cart
- Update cart quantity
- Remove product from cart
- Remove one item from multiple cart items
- Guest checkout flow
- Order success validation
- API + UI login validation

---

## Project Structure

```text
playwright-automation-ecommerce/
│
├── .github/
│   └── workflows/
│
├── config/
│   └── env.config.ts
│
├── fixtures/
│   └── baseTest.ts
│
├── pages/
│   ├── base/
│   ├── cart/
│   ├── checkout/
│   ├── home/
│   ├── login/
│   ├── products/
│   ├── register/
│   └── success/
│
├── testData/
│   ├── register.ts
│   ├── uiAssertions.ts
│   └── users.ts
│
├── tests/
│   ├── cart/
│   ├── e2e/
│   ├── login/
│   └── search/
│
├── utils/
│
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
Prerequisites
---------------
Before running this project, make sure you have installed:

Node.js
npm
Git
Google Chrome

Setup Instructions
-----------------
1. Clone the repository
2. Install dependencies
    npx playwright install
3. Create .env file
4. Update .env values
  Example  
  ---------
    # Authentication
        STANDARD_USER=your_login_username
        STANDARD_PASS=your_login_password

     # Base URL
            BASE_URL=[automationteststore.com](https://automationteststore.com)

    # Registration test user
        USER_NAME=your_registration_username
        PASSWORD=your_registration_password
        TEST_EMAIL=your_email@example.com
        TEST_PASSWORD=your_password

    # Optional faker seed
        FAKER_SEED=123

5. Run Tests
        Run all tests:
        bash
            npm test

Author
Anjaly Paul
GitHub: https://github.com/AnjalyKiran
