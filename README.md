# ParaBank E2E Test Suite

![Playwright](https://img.shields.io/badge/Playwright-1.58-blue)
![Allure](https://img.shields.io/badge/Allure-Report-green)
![License](https://img.shields.io/badge/License-ISC-yellow)

Professional E2E test automation for the [ParaBank](https://parabank.parasoft.com/parabank/index.htm) application, implemented with **Playwright**, **Page Object Model (POM)** architecture, and **Allure** reporting.

**Latest Allure report:** [https://pavlovic-bojan.github.io/final-assignment/](https://pavlovic-bojan.github.io/final-assignment/)

## 📋 Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Docker](#docker)
- [Allure Reports](#allure-reports)
- [Project Structure](#project-structure)
- [CI/CD](#cicd)
- [Test Scenarios](#test-scenarios)

## Requirements

- **Node.js** 18+
- **npm** 9+

For Allure reports:
- **Java** 17+ (for `allure-commandline`)

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd parabank-e2e-tests

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium
```

## Running Tests

```bash
# All tests (headless)
npm test

# With browser visible
npm run test:headed

# Interactive UI mode
npm run test:ui

# Specific test file
npx playwright test tests/01-homepage-elements.spec.ts
```

## Docker

Run tests in a container without installing Node.js or Playwright browsers locally:

```bash
# Build and run tests
docker compose run --rm playwright

# Or with docker-compose (legacy)
docker-compose run --rm playwright
```

The Docker setup uses the official Playwright image (`mcr.microsoft.com/playwright`) and mounts:
- `test-results/` – test output and screenshots
- `allure-results/` – Allure raw data
- `allure-report/` – generated Allure HTML report
- `test-data/` – persisted user credentials between test runs

**Requirements:** Docker and Docker Compose

## Allure Reports

The latest Allure report is hosted on GitHub Pages: **[https://pavlovic-bojan.github.io/final-assignment/](https://pavlovic-bojan.github.io/final-assignment/)** (Allure report: `/allure/`)

To generate reports locally:

```bash
# Run tests + generate + open Allure report
npm run allure:report

# Or step by step:
npm run test:allure              # Run tests
npm run allure:generate          # Generate HTML report
npm run allure:open              # Open report in browser
```

The Allure report includes:
- Test execution history
- Screenshots and traces on failure
- Step-by-step breakdown of actions
- Grouping by test suites

## Project Structure

```
parabank-e2e-tests/
├── .github/
│   └── workflows/
│       └── playwright.yml      # GitHub Actions CI/CD
├── constants/
│   └── menu.ts                 # Menu constants (MENU_ITEMS, CLICKABLE_MENU_ITEMS)
├── fixtures/
│   ├── pages.ts                # Page Object fixtures (homePage, registerPage)
│   └── test-data.ts            # Test data fixtures (Faker, registeredUser, accountsPage)
├── pages/                      # Page Object Model
│   ├── BasePage.ts             # Base page
│   ├── HomePage.ts             # Home page
│   ├── RegisterPage.ts         # Registration form
│   └── AccountsPage.ts         # Post-login pages
├── tests/
│   ├── 01-homepage-elements.spec.ts
│   ├── 02-menu-links.spec.ts
│   ├── 03-login-section.spec.ts
│   ├── 04-registration-required-fields.spec.ts
│   ├── 05-registration-success.spec.ts
│   ├── 06-registration-password-mismatch.spec.ts
│   ├── 07-login.spec.ts
│   └── 08-open-new-account.spec.ts
├── docker-compose.yml        # Docker Compose for running tests in container
├── Dockerfile                # Playwright image with Chromium
├── playwright.config.ts
├── package.json
└── README.md
```

### Page Object Model (POM)

The project uses POM architecture for maintainability and code reuse:

| Page Object | Description |
|-------------|-------------|
| `BasePage` | Shared methods for all pages |
| `HomePage` | Login form, menu, navigation |
| `RegisterPage` | Registration form and validations |
| `AccountsPage` | Accounts Overview, Open New Account |

## CI/CD

The GitHub Actions workflow (`.github/workflows/playwright.yml`) runs on:
- `push` to `main`, `master`, `develop`
- `pull_request` to these branches

**Workflow steps:**
1. Checkout code
2. Setup Node.js 20
3. `npm ci` – install dependencies
4. Install Chromium browser
5. Run tests
6. Generate Allure report
7. Upload artifacts (Allure report, traces on failure)

**Artifacts:**
- `allure-report` – Allure HTML report (30 days)
- `playwright-report` – Playwright HTML report on failure (7 days)
- `test-results` – Trace files on failure (7 days)

## Test Scenarios

| # | File | Description |
|---|------|-------------|
| 1 | `01-homepage-elements` | Visibility of all key elements on the home page |
| 2 | `02-menu-links` | Menu links (Solutions, About Us, Services, etc.) – visibility and clickability |
| 3 | `03-login-section` | Login section and links (Forgot login, Register) |
| 4 | `04-registration-required-fields` | Required registration form fields (excluding phone) |
| 5 | `05-registration-success` | Successful registration with Faker data |
| 6 | `06-registration-password-mismatch` | Password/Confirm mismatch validation |
| 7 | `07-login` | Login of registered user |
| 8 | `08-open-new-account` | Opening a new Savings account |

### Techniques Used

- **Fixtures (Playwright best practice)** – `fixtures/pages.ts` (homePage, registerPage), `fixtures/test-data.ts` (registrationData, registeredUser, accountsPage)
- **baseURL** in playwright.config – navigation uses relative paths
- **Saving to file** – `test-data/user.json` for credentials between tests
- **Parametrization** – `for...of` for menu links
- **POM** – Page Object Model with fixtures (per Playwright documentation)

## Notes

- Tests 7 and 8 use the user from test 5 (or register a new one if `test-data/user.json` does not exist)
- For stability, tests run sequentially (`workers: 1`)
- In CI environment: 2 retries on failure

## Troubleshooting

**"Executable doesn't exist" / Browser not found**
```bash
npx playwright install chromium
```

**Tests timing out** – ParaBank is an external site and can be slow. Timeouts are set to 60s (navigation) and 15s (actions). If failures persist, check network connectivity.

## License

ISC
