// Valid recruiter signup → 201

import { test, expect } from '@playwright/test';
import { createAPIContext } from '../../../../utils/apiClient';

test('Recruiter signup should return 201', async () => {

    const api = await createAPIContext();

    const uniqueEmail = `recruiter_${Date.now()}@test.com`;

    const response = await api.post('user/register', {
        data: {
            fullname: 'Test Recruiter',
            email: uniqueEmail,
            phoneNumber: '9999999999',
            password: 'password123',
            role: 'recruiter'
        }
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.message).toContain('Account');

    await api.dispose();
});
