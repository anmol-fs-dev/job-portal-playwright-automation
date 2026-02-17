import { request } from '@playwright/test';

/**
 * Creates a new API request context.
 * 
 * This acts as our backend communication layer.
 * It allows tests and fixtures to interact directly
 * with the server without using the browser.
 */
export async function createAPIContext() {

    const apiContext = await request.newContext({

        // Base URL for all API requests
        // Loaded from .env via playwright.config.js
        baseURL: process.env.API_URL,

        // Default headers applied to every request
        extraHTTPHeaders: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },

        // Optional: ignore HTTPS errors (useful in QA/self-signed certs)
        ignoreHTTPSErrors: true,

        // Optional: set timeout for API calls
        timeout: 30000
    });


    return apiContext;
}
