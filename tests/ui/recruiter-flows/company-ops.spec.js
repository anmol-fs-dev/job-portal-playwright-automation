import { test, expect } from '@playwright/test';
import { users } from '../../../test-data/users';
import { LoginPage } from '../../../pages/LoginPage';
import { AdminCompaniesPage } from '../../../pages/AdminCompaniesPage';
import { CompanyCreatePage } from '../../../pages/CompanyCreatePage';
import { CompanySetupPage } from '../../../pages/CompanySetupPage';

/**
 * Recruiter Flows: End-to-end tests for recruiter actions.
 * This test verifies the full flow from login to new company creation and setup.
 */

test('user should be able to login successfully', async ({ page }) => {
    // 1. Initialize all required Page Objects
    const loginPage = new LoginPage(page);
    const adminCompaniesPage = new AdminCompaniesPage(page);
    const companyCreatePage = new CompanyCreatePage(page);
    const companySetupPage = new CompanySetupPage(page);

    // 2. Login as a recruiter
    await loginPage.navigate();
    await loginPage.login(users.recruiter.email, users.recruiter.password, users.recruiter.role);

    // 3. Verify landing on the Admin Companies dashboard
    await expect(page).toHaveURL('admin/companies');

    // 4. Start the New Company creation flow
    const uniqueCompanyName = `Test Company Name ${Date.now()}`;
    await adminCompaniesPage.clickNewCompany();

    // 5. Assert presence of company name field and fill it
    await expect(page.getByText('Your Comapny Name')).toBeVisible();
    await companyCreatePage.enterCompanyName(uniqueCompanyName);
    await companyCreatePage.clickContinue();

    // 6. Verify moving to Step 2: Company Setup
    await expect(page.getByText('Company Setup')).toBeVisible();

    // 7. Complete the company details form
    await companySetupPage.setupCompany({
        description: "This is a test company description",
        website: "https://www.google.com",
        location: "Random Location"
    });

    // 8. Assert that the user is redirected back to the companies list after success
    await expect(page).toHaveURL('admin/companies');
});



/**
 * Recruiter Flows: End-to-end tests for recruiter actions.
 * This test verifies the full flow from login to edit an existing company's details.
 */

test('user should be able to edit an existing company', async ({ page }) => {
    // 1. Initialize all required Page Objects
    const loginPage = new LoginPage(page);
    const adminCompaniesPage = new AdminCompaniesPage(page);
    const companySetupPage = new CompanySetupPage(page);

    // 2. Login as a recruiter
    await loginPage.navigate();
    await loginPage.login(users.recruiter.email, users.recruiter.password, users.recruiter.role);

    // 3. Verify landing on the Admin Companies dashboard
    await expect(page).toHaveURL('admin/companies');

    // 4. Use one of the existing companies for editing (as seen in screenshot)
    const companyToEdit = "Avant IT solution";

    // 5. Filter for the company
    await adminCompaniesPage.filterCompanies(companyToEdit);

    // 6. Click the action button and select Edit
    await adminCompaniesPage.clickActionForCompany(companyToEdit);
    await adminCompaniesPage.clickEdit();

    // 7. Verify we are on the Company Setup page for editing
    await expect(page.getByText('Company Setup')).toBeVisible();

    // 8. Update the company details using the POM method
    await companySetupPage.setupCompany({
        description: "Updated test company description",
        website: "https://www.updated-website.com",
        location: "Updated Location"
    });

    // 9. Assert that we are redirected back to the companies list
    await expect(page).toHaveURL('admin/companies');
});
