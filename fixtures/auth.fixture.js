import { test as base } from '@playwright/test';
import { createAPIContext } from '../utils/apiClient';
import { users } from '../test-data/users';

async function loginAs(browser, user) {
    const api = await createAPIContext();

    const response = await api.post('user/login', {
        data: user
    });

    const setCookie = response.headers()['set-cookie'];
    const token = setCookie.match(/token=([^;]+)/)[1];

    const context = await browser.newContext();

    await context.addCookies([{
        name: 'token',
        value: token,
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        secure: false
    }]);

    await api.dispose();

    return context.newPage();
}

export const test = base.extend({
    studentPage: async ({ browser }, use) => {
        const page = await loginAs(browser, users.student);
        await use(page);
        await page.context().close();
    },

    recruiterPage: async ({ browser }, use) => {
        const page = await loginAs(browser, users.recruiter);
        await use(page);
        await page.context().close();
    }
});

export const expect = base.expect;
