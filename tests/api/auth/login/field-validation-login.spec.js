import { test, expect } from '@playwright/test';
import { createAPIContext } from '../../../../utils/apiClient';

// 1. Login without email input

test('login should fail when email is missing', async () => {

    const api = await createAPIContext();

    const response = await api.post('user/login', {
        data: {
            password: 'studentuser',
            role: 'student'
        }
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.success).toBe(false);

    await api.dispose();
});


// 2. Login without password input

test('login should fail when password is missing', async () => {

    const api = await createAPIContext();

    const response = await api.post('user/login', {
        data: {
            email: 'teststudentuser@123.com',
            role: 'student'
        }
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.success).toBe(false);

    await api.dispose();
});


// 3. Login with wrong role

test('login should fail when role is wrong', async () => {

    const api = await createAPIContext();

    const response = await api.post('user/login', {
        data: {
            email: 'teststudentuser@123.com',
            password: 'studentuser',
            role: 'wrong user type'
        }
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.success).toBe(false);

    await api.dispose();
});
