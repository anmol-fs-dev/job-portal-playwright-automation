import { test, expect } from '@playwright/test';
import { createAPIContext } from '../../../../utils/apiClient';


// Missing required fields → 400

test('signup should fail when email is missing', async () => {

    const api = await createAPIContext();

    const response = await api.post('user/register', {
        data: {
            fullname: 'Test Student',
            phoneNumber: '9999999999',
            password: 'password123',
            role: 'student'
        }
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.success).toBe(false);

    await api.dispose();
});


// Invalid role → 400

test('signup should fail when role is invalid', async () => {

    const api = await createAPIContext();

    const response = await api.post('user/register', {
        data: {
            fullname: 'Test Student',
            email: `student_${Date.now()}@test.com`,
            phoneNumber: '9999999999',
            password: 'password123'
        }
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.success).toBe(false);

    await api.dispose();
});

// Duplicate email → 400

test('signup should fail when email is duplicate', async () => {

    const api = await createAPIContext();

    const response = await api.post('user/register', {
        data: {
            fullname: 'Test Student',
            email: `teststudentuser@123.com`,
            phoneNumber: '9999999999',
            password: 'password123',
            role: 'student'
        }
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.success).toBe(false);

    await api.dispose();
});
