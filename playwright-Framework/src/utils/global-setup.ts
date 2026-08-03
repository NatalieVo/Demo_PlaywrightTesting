import { cpSync, existsSync, mkdirSync, rmSync } from 'fs';
import path from 'path';

export default function globalSetup() {
  const resultsDir = 'allure-results';
  const reportHistoryDir = path.join('allure-report', 'history');
  const resultsHistoryDir = path.join(resultsDir, 'history');

  if (existsSync(resultsDir)) {
    rmSync(resultsDir, { recursive: true, force: true });
  }
  mkdirSync(resultsDir, { recursive: true });

  // Preserve history from previous report so Allure keeps trend/history across runs
  if (existsSync(reportHistoryDir)) {
    cpSync(reportHistoryDir, resultsHistoryDir, { recursive: true });
  }
}
