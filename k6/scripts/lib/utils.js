import { check } from 'k6';
import { Counter, Rate } from 'k6/metrics';

// Reusable global metrics
export const errorCounter = new Counter('errors');
export const successRate = new Rate('success_rate');

/**
 * Check HTTP response and record metrics
 * @param {object} res - HTTP response object
 * @param {object} checks - Object with check functions
 * @param {string} name - Name of the check for logging
 * @returns {boolean} - Result of the check
 */
export function checkResponse(res, checks, name = '') {
  const checkResult = check(res, checks);
  
  if (!checkResult) {
    errorCounter.add(1);
    console.error(`Check failed: ${name || 'Request'}`);
  }
  
  successRate.add(checkResult);
  return checkResult;
}

/**
 * Generate random data for tests
 * @returns {object} - Object with random data
 */
export function randomData() {
  return {
    id: Math.floor(Math.random() * 10000),
    timestamp: new Date().toISOString(),
    value: Math.random().toFixed(2)
  };
}