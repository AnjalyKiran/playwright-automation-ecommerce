*********QA Automation Assignment***********

This project includes UI automation using Playwright and API automation using Postman and Newman.

Pre-requisite
-------------
node.js

Steps to run the project
-------------------------
1. Clone the repository
2. Navigate to project folder

cd playwright-automation-ecommerce

3. Install dependencies

Run npm install //To download all dependancies

Tools Used
-----------

Playwright (UI automation)
TypeScript
Postman (API testing)
Newman (CLI execution for API tests)

Project Structure
-----------------
pages/        → Page Object Model files  
tests/        → Test files (api, auth, e2e)  
postman/      → Postman collection and environment files  
utils/        → Helper files 

UI Automation
------------- 
Website tested:https://automationteststore.com/

Scenarios Covered
----------------
User Registration
Login
Add Product → Checkout → Success
Product Search Validation
Backend response validation

Run UI Tests
-------------
npx playwright test //command to run the test

View HTML Report
---------------
npx playwright show-report //command to view the report
HTML report is enabled in playwright.config.ts.
Screenshots and trace files are captured automatically on failure.

API Automation
--------------
API used:https://postman-echo.com/

Scenarios Covered
------------------

GET request with query parameters
POST request
PUT request
PATCH request
Header validation
Negative scenario (400 status)
Missing field validation

Run API Tests
-------------
npm run api-test //command to run the api-test
Initially, I tried using public APIs such as ReqRes for API testing. However, I encounted 403 error,thats why I used Postman Echo to ensure stable execution and proper validation of requests and responses.

Notes
-----
Page Object Model is implemented for UI tests.
Environment variables are used.
HTML reporting is enabled.
Negative scenarios are included for both UI and API testing.
Playwright manages browsers internally (no separate ChromeDriver is required).

Locator and Waiting Strategy
----------------------------

I used Playwright’s built-in locators such as getByRole, getByText, xpath and CSS selectors where appropriate.

I preferred stable and readable locators.

I avoided using hard waits like waitForTimeout.

I relied on Playwright’s auto-waiting mechanism and assertions such as:

expect(element).toBeVisible()

expect(page).toHaveURL()

Page navigation and element visibility were validated before performing actions.

This approach makes tests more stable and less flaky.

What I Prioritized to Automate
------------------------------

Core user flows (registration, login, product search, checkout)

Critical path (Add to Cart → Checkout → Success)

API request/response validation

Negative scenarios (error status codes, missing fields)

These flows represent real user behavior and important business functionality.

What I Avoided and Why
----------------------

Testing UI styling (colors, fonts, layout), since they are not part of functional testing.

Using fixed delays (waitForTimeout) because they can cause flaky tests.

Very minor UI validations that do not affect core functionality.

This helped keep the tests focused, stable, and maintainable.