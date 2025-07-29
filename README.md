# 🧪 Playwright Automation Framework - AutomationExercise

<!-- Banner Image -->
<p align="center">
  <img src="assets\cover.png" alt="Automation Framework Banner" style="width:100%; max-width:1200px;">
</p>


End-to-end automation test framework for [AutomationExercise](https://automationexercise.com), built with [Playwright](https://playwright.dev).

---

## 📁 Project Structure

├── configs/                   # Environment and global configs  
├── fixtures/                  # Static test data (JSON, user info)  
├── pages/                     # Page Object Model (POM) classes  
├── playwright-report/         # HTML test reports  
├── resources/                 # Screenshots, logs, etc.  
├── test-results/              # Raw test artifacts  
├── test/  
│   ├── api/                   # API test cases (if applicable)  
│   ├── ui/                    # UI test cases (functional)  
│   └── regressions/           # Regression or end-to-end scenarios  
├── utils/                     # Helpers, data generators, environment utils  
├── src/                       # Optional business logic or wrappers  
├── playwright.config.ts       # Playwright config  
└── README.md                  # Project documentation

---

## 🚀 Tech Stack

- ✅ Playwright Test  
- ✅ TypeScript or JavaScript  
- ✅ Page Object Model (POM)  
- ✅ Allure Reports (optional)  
- ✅ Faker.js for dynamic test data  
- ✅ GitHub Actions for CI/CD (optional)

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/playwright-automationexercise.git
cd playwright-automationexercise
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Install Playwright Browsers
```bash
npx playwright install
```

### 4. Run Tests
```bash
npx playwright test
```

### 5. View the Report
```bash
npx playwright show-report
```

## ⚙️ Playwright Configuration (playwright.config.ts)
```ts
import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests', // Or './test' if your actual test folder is named that
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',

  use: {
    browserName: 'chromium',
    headless: false, // 👀 UI opens by default
    baseURL: process.env.BASE_URL || 'https://automationexercise.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  
   // Define module-wise projects
  projects: [
    {
      name: 'auth',
      testMatch: /.*auth\/.*\.spec\.ts/,
    },
    {
      name: 'products',
      testMatch: /.*products\/.*\.spec\.ts/,
    },
    {
      name: 'contact',
      testMatch: /.*contact\/.*\.spec\.ts/,
    },
  ]
});
```

## 📄 Sample Test File (UI)

```ts
// test/ui/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('Valid login flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('user@example.com', 'password123');
  await expect(page.locator('text=Logged in as')).toBeVisible();
});
```

##  📂 Page Object Model Example

```ts
// pages/LoginPage.ts
import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async login(username: string, password: string) {
    await this.page.fill('input[data-qa="login-email"]', username);
    await this.page.fill('input[data-qa="login-password"]', password);
    await this.page.click('button[data-qa="login-button"]');
  }
}
```

##  🧪 Test Scenarios Roadmap
✅ User Registration with valid details
✅ Login with valid and invalid credentials
✅ Add product to cart
✅ Remove product from cart
✅ Checkout flow with address/payment
✅ Contact form submission
✅ Product search validation
✅ Logout flow
✅ Navigation through product categories
✅ Responsive test (Mobile/Desktop)

##  🧰 Utilities and Tools
- Faker for generating random user data
- Screenshot and trace capturing for failures
- Environment support via config files
- CLI commands for running and debugging tests
- GitHub Actions pipeline (optional)

##  📊 Reporting
- Built-in Playwright HTML Reporter

- Optionally integrate Allure Reports

```bash
npx playwright show-report
```

## 🧪 Run Tests by Suite or Module (like TestNG groups)
You can define and run groups of tests similar to TestNG groups using:

* ✅ Tag-based execution
- Use @smoke or @regression in your test titles or with test.describe():

```ts
test('@smoke Should login successfully', async ({ page }) => {
  // smoke test logic
});
```

* Run tagged tests:

```bash
npm run test:smoke           # only @smoke tests
npm run test:regression      # all except @smoke
```


* ✅ Module-based execution
- Organize tests in folders (/auth, /products, etc.) and run by module:

```bash
npm run test:auth            # auth only
npm run test:products        # products only
npm run test:auth-contact    # auth + contact modules
```

* ✅ Combined multiple modules

```bash
npm run test:modules         # all defined modules (auth, contact, products)
package.json Scripts Reference
```

```json
"scripts": {
  "test:auth": "npx playwright test --project=auth",
  "test:products": "npx playwright test --project=products",
  "test:contact": "npx playwright test --project=contact",
  "test:modules": "npx playwright test --project=auth --project=products --project=contact",
  "test:smoke": "npx playwright test --grep @smoke",
  "test:regression": "npx playwright test --grep-invert @smoke",
  "test:auth-contact": "npx playwright test tests/ui/{auth,contact}",
  "test:product-only": "npx playwright test tests/ui/products",
  "test:all-modules": "npx playwright test tests/ui"
}
```

* ✅ You can integrate these scripts easily into Jenkins, GitHub Actions, or any CI/CD pipeline.

## 🔧 Future Enhancements
- Add API test suite under test/api/
- Mock data with request interception
- Cross-browser and device grid testing
- Dockerized test runs
- CI/CD pipeline integration with GitHub Actions

##  📬 Feedback & Contributions
- Feel free to open issues or submit PRs to enhance this framework.
- Happy Testing 🚀

---

## 🤝 Collaboration Guidelines

- All contributions should be made via **pull requests** from a separate branch.
- Ensure your changes follow the project structure and pass Playwright tests locally.
- Pull requests will be reviewed and approved by the repository owner before merging into `main`.
- Direct pushes to the `main` branch are restricted.

---

## 🍴 Forking Instructions

If you’d like to contribute or customize this project:

1. **Fork** the repository by clicking the "Fork" button at the top-right on GitHub.
2. **Clone** your forked repository locally:
   ```bash
   git clone https://github.com/your-username/playwright-automationexercise.git
   cd playwright-automationexercise