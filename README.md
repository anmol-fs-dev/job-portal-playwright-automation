# 🚀 Professional E2E Test Automation Framework | Job Portal

[![Playwright](https://img.shields.io/badge/Playwright-Automation-green)](https://playwright.dev/)
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Architecture](https://img.shields.io/badge/Architecture-POM-blue)](#)

A high-performance, enterprise-grade test automation framework built with **Playwright**, **Node.js**, and **JavaScript**. This suite provides comprehensive end-to-end coverage for a modern Job Portal, featuring specialized flows for both **Recruiters** and **Students**.

---

## 🌟 Key Features

*   **🏗️ Page Object Model (POM)**: Scalable and maintainable architecture separating locators from test logic.
*   **🎭 Dual-Persona Coverage**:
    *   **Recruiter Flows**: Company management, job posting, applicant tracking, and status updates.
    *   **Student Flows**: Profile management (bio/skills), job browsing, intelligent filtering, and application tracking.
*   **🔗 Hybrid UI & API Testing**: Integrated API testing to verify backend integrity alongside frontend user journeys.
*   **🌍 Multi-Environment Support**: Seamlessly switch between `dev`, `qa`, and `prod` using dynamic environment configurations.
*   **📉 Automated Reporting**: Rich HTML reports with screenshots, video recordings, and full Playwright Trace Viewer snapshots for rapid debugging.
*   **🛡️ Robust Locators**: Intelligent wait strategies and stable locators designed to handle complex React state changes and animations (Framer Motion).

---

## 🛠️ Tech Stack

*   **Engine**: [Playwright](https://playwright.dev/)
*   **Language**: JavaScript / Node.js
*   **Utilities**: Dotenv (Env Management), ESLint (Linting)
*   **Reporting**: Playwright HTML Reporter / Trace Viewer

---

## 📁 Project Structure

```text
test-suite/
├── tests/
│   ├── ui/               # End-to-End User Journeys
│   │   ├── recruiter-flows/
│   │   ├── student-flows/
│   │   └── auth/         # Login/Signup Flows
│   └── api/              # Backend Integration Tests
├── pages/                # Page Object Model (POM) Classes
├── test-data/            # Centralized Test Users & Mock Data
├── config/               # Environment-specific configurations
└── playwright.config.js  # Global Framework Configuration
```

---

## 🚦 Getting Started

### 1. Prerequisites
*   [Node.js](https://nodejs.org/) (v18+)
*   Playwright installed (`npx playwright install`)

### 2. Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd job-portal/test-suite

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.qa
```

### 3. Running Tests
```bash
# Run all tests (Headed/Headless)
npx playwright test

# Run UI tests only
npx playwright test --project=ui-chromium

# Run API tests only
npx playwright test --project=api

# View HTML Report
npx playwright show-report
```

---

## 📊 Reporting & Debugging

This framework is configured to capture **screenshots and videos on failure**. For deep analysis, you can inspect the full execution trace:

```bash
# Open the last execution trace
npx playwright show-trace test-results/<folder>/trace.zip
```

---

## 👨‍💻 Author
**Anmol Singh**  
*Quality Assurance Engineer / SDET*

> [!TIP]
> This framework is designed with an **"Enterprise First"** mindset—modular, data-driven, and ready for CI/CD integration.
