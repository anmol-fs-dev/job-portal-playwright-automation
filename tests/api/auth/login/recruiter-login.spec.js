import { test, expect } from '@playwright/test';
import { createAPIContext } from '../../../../utils/apiClient';
import { users } from '../../../../test-data/users';

test('recruiter login should return 200 and token cookie', async () => {

    const api = await createAPIContext();

    const response = await api.post('user/login', {
        data: users.recruiter
    });

    expect(response.status()).toBe(200);

    const headers = response.headers();
    expect(headers['set-cookie']).toContain('token=');

    await api.dispose();
});


// login should fail with wrong credentials

test('login should fail with wrong password', async () => {

    const api = await createAPIContext();

    const response = await api.post('user/login', {
        data: {
            email: users.recruiter.email,
            password: 'wrongpass',
            role: users.recruiter.role
        }
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.success).toBe(false);

    await api.dispose();
});


