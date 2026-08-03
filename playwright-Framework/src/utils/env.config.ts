import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const ENV = {
  BASE_URL: process.env.BASE_URL || 'https://crm.anhtester.com/admin/authentication',
  DASHBOARD_URL: process.env.DASHBOARD_URL || 'https://crm.anhtester.com/admin/',
  HEADED: process.env.HEADED === 'true',
  SLOW_MO: parseInt(process.env.SLOW_MO || '0'),
  ACTION_TIMEOUT: parseInt(process.env.ACTION_TIMEOUT || '10000'),
  NAVIGATION_TIMEOUT: parseInt(process.env.NAVIGATION_TIMEOUT || '30000'),
  EXPECT_TIMEOUT: parseInt(process.env.EXPECT_TIMEOUT || '10000'),
  TEST_USER_EMAIL: process.env.TEST_USER_EMAIL || '',
  TEST_USER_PASSWORD: process.env.TEST_USER_PASSWORD || '',
  ALLURE_RESULTS_DIR: process.env.ALLURE_RESULTS_DIR || 'allure-results',
} as const;
