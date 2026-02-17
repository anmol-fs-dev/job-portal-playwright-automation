import { test, expect } from '@playwright/test';
import { createAPIContext } from '../../utils/apiClient';

test('GET /job/get should return 200 and jobs array', async () => {

    // Create isolated API client
    const api = await createAPIContext();

    // Make GET request to public endpoint
    const response = await api.get('job/get');

    // Assert status
    expect(response.status()).toBe(200);

    // Parse JSON body
    const body = await response.json();

    // Basic structure validation
    expect(body).toHaveProperty('success');
    expect(body.success).toBe(true);

    expect(body).toHaveProperty('jobs');
    expect(Array.isArray(body.jobs)).toBe(true);

    // Cleanup
    await api.dispose();
});
