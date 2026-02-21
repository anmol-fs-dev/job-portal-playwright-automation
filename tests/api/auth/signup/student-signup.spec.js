import { test, expect } from '@playwright/test';
import { createAPIContext } from '../../../../utils/apiClient';


// Valid student signup → 201
test('Student signup should return 201', async () => {

    const api = await createAPIContext();

    const uniqueEmail = `student_${Date.now()}@test.com`;

    const response = await api.post('user/register', {
        data: {
            fullname: 'Test Student',
            email: uniqueEmail,
            phoneNumber: '9999999999',
            password: 'password123',
            role: 'student'
        }
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.message).toContain('Account');

    await api.dispose();
});


// Invalid student signup → 400
test('Student signup should return 400', async () => {

    const api = await createAPIContext();

    const uniqueEmail = `student_${Date.now()}@test.com`;

    const response = await api.post('user/register', {
        data: {
            fullname: 'Test Recruiter',
            email: uniqueEmail,
            phoneNumber: '9999999999',
            password: 'password123'
        }
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.success).toBe(false);

    await api.dispose();
});



