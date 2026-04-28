# Playwright Automation E-commerce Project

This project automates key e-commerce workflows using Playwright and TypeScript.

## Tech Stack

- Playwright
- TypeScript
- Page Object Model
- Fixtures
- GitHub Actions
- HTML Report

## Test Scenarios

- User registration
- Login
- Product search
- Cart quantity update
- Remove item from cart
- Remove one item from multiple cart items
- Checkout flow
- API + UI login validation

## Project Structure

- `pages/` - Page Objects, locators, and actions
- `tests/` - Test specifications
- `fixtures/` - Custom Playwright fixtures
- `config/` - Environment configuration
- `utils/` - Reusable helpers and assertions

## How to Run Tests

```bash
npm install
npx playwright install
npx playwright test