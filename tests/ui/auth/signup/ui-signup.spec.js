import { test, expect } from '@playwright/test';
import { SignupPage } from '../../../../pages/SignupPage';

/**
 * UI Signup tests verify the user registration process.
 */

// Positive test case: Successful signup for a student user
test('user should be able to signup successfully', async ({ page }) => {
    // 1. Initialize the Signup Page Object
    const signupPage = new SignupPage(page);

    // 2. Navigate to the signup page
    await signupPage.navigate();

    // 3. Generate a unique email to avoid "email already exists" conflicts
    const uniqueEmail = `student_${Date.now()}@test.com`;

    // 4. Fill and submit the signup form using the Page Object method
    await signupPage.signup({
        fullname: 'John Doe',
        email: uniqueEmail,
        password: 'studentuser',
        phoneNumber: '9999999999',
        role: 'student'
    });

    // 5. Assert successful registration by checking the final destination URL
    await page.goto('/browse');
    await expect(page).toHaveURL('/browse');
});

// Negative test case: Attempting to signup with incomplete data
test('user should not be able to signup by incorrectly filling up the form', async ({ page }) => {
    // 1. Initialize the Signup Page Object
    const signupPage = new SignupPage(page);

    // 2. Navigate to /signup
    await signupPage.navigate();

    // 3. Generate a unique email
    const uniqueEmail = `student_${Date.now()}@test.com`;

    // 4. Submit the form MISSING a required field (phoneNumber)
    await signupPage.signup({
        fullname: 'John Doe',
        email: uniqueEmail,
        password: 'studentuser',
        role: 'student'
    });

    // 5. Assert that the user is NOT redirected (remains on /signup)
    await expect(page).toHaveURL('/signup');
});
