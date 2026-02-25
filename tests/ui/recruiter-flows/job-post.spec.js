import { test, expect } from '@playwright/test';
import { users } from '../../../test-data/users';
import { LoginPage } from '../../../pages/LoginPage';
import { AdminCompaniesPage } from '../../../pages/AdminCompaniesPage';
import { AdminJobsPage } from '../../../pages/AdminJobsPage';
import { JobsCreationPage } from '../../../pages/JobsCreationPage';
import { JobApplicantsPage } from '../../../pages/JobApplicantsPage';

/**
 * End-to-end test for a recruiter posting a new job.
 */
test('Recruiter creates a new job posting', async ({ page }) => {
    // 1. Initialize Page Objects
    const loginPage = new LoginPage(page);
    const adminCompaniesPage = new AdminCompaniesPage(page);
    const adminJobsPage = new AdminJobsPage(page);
    const jobsCreationPage = new JobsCreationPage(page);

    // 2. Login as a recruiter
    await loginPage.navigate();
    await loginPage.login(users.recruiter.email, users.recruiter.password, users.recruiter.role);

    // 3. Verify landing on the Admin Companies dashboard
    await expect(page).toHaveURL('admin/companies');

    // 4. Navigate to the Jobs page
    await adminCompaniesPage.clickJobs();

    // 5. Verify landing on the Jobs page
    await expect(page).toHaveURL('admin/jobs');

    // 6. Click the button to start a new job posting
    await adminJobsPage.clickPostNewJob();

    // 7. Verify landing on the Job Creation page
    await expect(page).toHaveURL('admin/jobs/create');

    // 8. Fill and submit the job posting form
    await jobsCreationPage.postJob({
        title: "Senior QA Engineer",
        location: "San Francisco",
        description: "Must have Playwright experience.",
        skills: "Playwright, Javascript, Testing",
        salary: 15,
        jobType: "Full Time",
        experience: 5,
        openings: 2,
        company: "Avant IT solution"
    });

    // 9. Verify redirection back to the jobs list
    await expect(page).toHaveURL('admin/jobs');
});

/**
 * Recruiter views applicants for a specific job.
 */
test('Recruiter views applicants for a job', async ({ page }) => {
    // 1. Initialize Page Objects
    const loginPage = new LoginPage(page);
    const adminCompaniesPage = new AdminCompaniesPage(page);
    const adminJobsPage = new AdminJobsPage(page);

    // 2. Login as a recruiter
    await loginPage.navigate();
    await loginPage.login(users.recruiter.email, users.recruiter.password, users.recruiter.role);

    // 3. Navigate to the Jobs page
    await adminCompaniesPage.clickJobs();
    await expect(page).toHaveURL(/.*\/admin\/jobs/);

    // 4. Filter for a specific job (e.g., the one created in the previous test or an existing one)
    const jobTitle = "Senior QA Engineer";
    await adminJobsPage.filterJobs(jobTitle);

    // 5. Click the action button for the job
    await adminJobsPage.clickActionForJob(jobTitle);

    // 6. Click View Applicants
    await adminJobsPage.clickViewApplicants();

    // 7. Verify navigation to the applicants page
    // The URL structure is admin/jobs/[jobId]/applicants
    await expect(page).toHaveURL(/.*\/applicants/);
    await expect(page.getByText('Applicants')).toBeVisible();
});

/**
 * Recruiter updates an applicant's status.
 */
test('Recruiter changes applicant status', async ({ page }) => {
    // 1. Initialize Page Objects
    const loginPage = new LoginPage(page);
    const adminCompaniesPage = new AdminCompaniesPage(page);
    const adminJobsPage = new AdminJobsPage(page);
    const jobApplicantsPage = new JobApplicantsPage(page);

    // 2. Login as a recruiter
    await loginPage.navigate();
    await loginPage.login(users.recruiter.email, users.recruiter.password, users.recruiter.role);

    // 3. Navigate to the Jobs page
    await adminCompaniesPage.clickJobs();
    await expect(page).toHaveURL(/.*\/admin\/jobs/);

    // 4. Filter for "MIS Developer"
    const targetJob = "MIS Developer";
    await adminJobsPage.filterJobs(targetJob);

    // 5. Click Action button for the job and View Applicants
    await adminJobsPage.clickActionForJob(targetJob);
    await adminJobsPage.clickViewApplicants();

    // 6. Verify landing on Applicants page
    await expect(page).toHaveURL(/.*\/applicants/);

    // 7. Change status for an applicant (using first matching applicant if multiple)
    // We'll try to find an applicant name from the table if possible, 
    // but typically we'd use a known test applicant.
    // For now, let's assume we can target by a generic row if name is unknown, 
    // or just click the first action button available.
    // We'll use a placeholder or generic approach if the user didn't specify an applicant name.

    // Attempt to click the first action button in the applicants table
    await page.locator('tr').nth(1).locator('button').click(); // Row 0 is header, Row 1 is first applicant

    // 8. Select "Accepted"
    await jobApplicantsPage.selectStatus('Accepted');

    // 9. Verify success message
    await jobApplicantsPage.verifyStatusUpdateSuccess();
});
