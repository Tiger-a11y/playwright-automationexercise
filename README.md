# 🧪 Playwright Automation Framework - AutomationExercise

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

export default defineConfig({
  testDir: './test',
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: 'https://automationexercise.com',
    browserName: 'chromium',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  reporter: [['html'], ['list']],
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

## 🔧 Future Enhancements
- Add API test suite under test/api/
- Mock data with request interception
- Cross-browser and device grid testing
- Dockerized test runs
- CI/CD pipeline integration with GitHub Actions

##  📬 Feedback & Contributions
- Feel free to open issues or submit PRs to enhance this framework.
- Happy Testing 🚀

- # Would you like this saved as a `.md` file for direct download? I can generate that for you as well.