import { test, expect } from '@playwright/test';
import { users } from '../../../test-data/users';
import { LoginPage } from '../../../pages/LoginPage';
import { StudentProfilePage } from '../../../pages/StudentProfilePage';

test.describe('Student Profile Flows', () => {
    let loginPage;
    let studentProfilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        studentProfilePage = new StudentProfilePage(page);

        // Login as student
        await loginPage.navigate();
        await loginPage.login(users.student.email, users.student.password, users.student.role);

        // Verify login success
        await expect(page.getByText(/Welcome back/i)).toBeVisible();

        // Navigate to profile
        await studentProfilePage.navigate();
    });

    test('Student should be able to edit profile', async ({ page }) => {
        // 1. Wait for profile content to load
        await expect(page.getByText('Skills')).toBeVisible();

        // 2. Open edit dialog
        await studentProfilePage.clickEditProfile();

        // 2. Update bio and skills
        const updatedBio = `I am a passionate software student. Updated at ${new Date().getTime()}`;
        const updatedSkills = "Javascript, React, Playwright, Automation";

        await studentProfilePage.updateProfile({
            bio: updatedBio,
            skills: updatedSkills
        });

        // 3. Verify success message
        await studentProfilePage.verifyUpdateSuccess();

        // 4. Verify changes in profile page
        await expect(page.getByText(updatedBio)).toBeVisible();
        // Skills are displayed as badges
        for (const skill of updatedSkills.split(', ')) {
            await expect(page.locator('[data-slot="badge"]').filter({ hasText: skill })).toBeVisible();
        }
    });

    test('Student should be able to see application status', async ({ page }) => {
        // Verify the applied jobs table is visible
        await expect(studentProfilePage.appliedJobsTitle).toBeVisible();

        // Check for "A list of your applied jobs" caption
        await expect(page.getByText('A list of your applied jobs')).toBeVisible();

        // Check if there are any jobs in the table. 
        // If empty, it should show "You haven't applied to any jobs yet."
        const noJobsMessage = page.getByText("You haven't applied to any jobs yet.");
        const jobRows = page.locator('tr');

        if (await jobRows.count() > 1) {
            // If there's at least one row besides header
            const firstJobStatus = page.locator('tr').nth(1).locator('[data-slot="badge"]');
            await expect(firstJobStatus).toBeVisible();
            const statusText = await firstJobStatus.textContent();
            expect(['PENDING', 'ACCEPTED', 'REJECTED']).toContain(statusText.trim().toUpperCase());
        } else {
            await expect(noJobsMessage).toBeVisible();
        }
    });
});
