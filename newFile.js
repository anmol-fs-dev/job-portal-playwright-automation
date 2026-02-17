import dotenv from 'dotenv';
import path from 'path';
import { env } from './playwright.config';

// Load environment file dynamically based on TEST_ENV
// Example: TEST_ENV=dev → loads .env.dev
dotenv.config({
    path: path.resolve(__dirname, `.env.${env}`)
});
