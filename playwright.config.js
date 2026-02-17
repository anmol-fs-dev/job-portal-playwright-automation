// @ts-check
// Enables TypeScript type-checking even inside a JS file.
// Helps VS Code give autocomplete and catch config mistakes.

import { defineConfig, devices } from '@playwright/test';
// defineConfig → Wraps your config with proper typings
// devices → Predefined browser/device settings (Desktop Chrome, iPhone, etc.)

import dotenv from 'dotenv';
// dotenv allows us to load environment variables from .env files

import path from 'path';
// path is a Node.js module to safely resolve file paths across OS (Windows/Mac/Linux)



/* =========================================================
   🌍 ENVIRONMENT CONFIGURATION (Multi-Environment Support)
   ========================================================= */

// We allow running tests against different environments:
// dev, qa, staging, prod

// If TEST_ENV is not passed in terminal,
// default to 'qa'
const env = process.env.TEST_ENV || 'qa';

// Load environment file dynamically based on TEST_ENV
// Example: TEST_ENV=dev → loads .env.dev
dotenv.config({
  path: path.resolve(__dirname, `.env.${env}`)
});

// After this, we can access:
// process.env.BASE_URL
// process.env.API_URL



/* =========================================================
   🎯 MAIN PLAYWRIGHT CONFIGURATION
   ========================================================= */

export default defineConfig({

  // Root folder where Playwright will look for test files
  // We structured our framework with separate UI and API folders inside
  testDir: './tests',

  // Allows test files to run in parallel
  // Speeds up execution significantly
  fullyParallel: true,

  // Prevents accidental commit of test.only
  // If someone pushes code with test.only in CI, build fails
  forbidOnly: !!process.env.CI,

  // Retry strategy:
  // On CI → retry 2 times (reduces flaky failure noise)
  // Locally → retry once (helps debugging flaky tests)
  retries: process.env.CI ? 2 : 1,

  // Number of parallel workers
  // On CI → 1 (safer, less flakiness)
  // Locally → use default (based on CPU cores)
  workers: process.env.CI ? 1 : undefined,



  /* =========================================================
     📊 REPORTERS
     ========================================================= */

  reporter: [
    // HTML report → Visual detailed report after test run
    ['html', { open: 'never' }],
    // open: 'never' ensures browser does not auto-open report in CI

    // list reporter → Clean CLI logs while running tests
    ['list']
  ],



  /* =========================================================
     ⚙️ GLOBAL TEST SETTINGS
     Applied to ALL projects unless overridden
     ========================================================= */

  use: {

    // Base URL for UI tests
    // Instead of writing full URL in tests:
    // page.goto('http://localhost:3000/login')
    // We can write:
    // page.goto('/login')
    baseURL: process.env.BASE_URL,

    // Capture screenshot only when test fails
    // Helps debugging without bloating storage
    screenshot: 'only-on-failure',

    // Record video only for failed tests
    video: 'retain-on-failure',

    // Collect trace (DOM snapshot + network + console)
    // Only on first retry to save performance
    trace: 'on-first-retry',

    // Max time allowed for a single action
    // Example: clicking, typing, etc.
    actionTimeout: 15000,

    // Max time allowed for page navigation
    navigationTimeout: 30000,
  },



  /* =========================================================
     🧩 PROJECTS (UI + API Separation)
     ========================================================= */

  projects: [

    /* ----------------------------
       🖥️ UI Project (Browser)
       ---------------------------- */
    {
      name: 'ui-chromium',

      // Only run tests from this folder
      testDir: './tests/ui',

      use: {
        // Use predefined Desktop Chrome config
        ...devices['Desktop Chrome'],
      },
    },


    /* ----------------------------
       🔌 API Project (No Browser)
       ---------------------------- */
    {
      name: 'api',

      // Only run tests from this folder
      testDir: './tests/api',

      use: {
        // API tests will use API base URL
        baseURL: process.env.API_URL,
      },
    }

  ],



  /* =========================================================
     🧪 OPTIONAL: Local Dev Server (Commented Out)
     ========================================================= */

  /*
  webServer: {
    // Command to start frontend before tests
    command: 'npm run start',

    // URL Playwright waits for before starting tests
    url: 'http://localhost:3000',

    // If server already running locally, reuse it
    reuseExistingServer: !process.env.CI,
  },
  */

});
