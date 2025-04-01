import { check } from 'k6';
import { errorCounter, successRate } from './metrics.js';

// Function to check HTTP response with metrics logging
export function checkResponse(res, checks, name = '') {
  const checkResult = check(res, checks);
  
  if (!checkResult) {
    errorCounter.add(1);
    console.error(`Check failed: ${name || 'Request'}`);
  }
  
  successRate.add(checkResult);
  return checkResult;
}

// Specific checks for REST APIs
export function checkApiGet(res, name = 'GET API') {
  return checkResponse(res, {
    'status is 200': (r) => r.status === 200,
    'response has data': (r) => r.json().length > 0
  }, name);
}

export function checkApiPost(res, name = 'POST API') {
  return checkResponse(res, {
    'status is 201': (r) => r.status === 201,
    'response has id': (r) => r.json().id !== undefined
  }, name);
} 