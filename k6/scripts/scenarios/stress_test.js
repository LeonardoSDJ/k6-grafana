import http from 'k6/http';
import { sleep, group } from 'k6';
import { Counter, Trend } from 'k6/metrics';
import { checkResponse } from '../lib/utils.js';
import { standardThresholds } from '../config/thresholds.js';

const failedRequests = new Counter('failed_requests');
const apiLatency = new Trend('api_latency');

export const options = {
  stages: [
    { duration: '2m', target: 50 },    // ramp-up to 50 users in 2 minutes
    { duration: '5m', target: 50 },    // steady at 50 users for 5 minutes
    { duration: '2m', target: 100 },   // ramp-up to 100 users in 2 minutes
    { duration: '5m', target: 100 },   // steady at 100 users for 5 minutes
    { duration: '2m', target: 0 },     // ramp-down to 0 users in 2 minutes
  ],
  thresholds: {
    ...standardThresholds,
    'failed_requests': ['count<10'],
    'api_latency': ['p(95)<400']
  },
};

export default function () {
  const BASE_URL = 'https://test.k6.io';

  group('Home Page Tests', function() {
    // Home page test group
    const homeRes = http.get(`${BASE_URL}/`);
    const homeSuccess = checkResponse(homeRes, {
      'home status is 200': (r) => r.status === 200,
      'home has correct title': (r) => r.body.includes('Welcome to the k6.io demo site!')
    }, 'Home Page');

    if (!homeSuccess) {
      failedRequests.add(1);
    }
  });

  sleep(1);

  group('API Tests', function() {
    // API test group
    const startTime = new Date();
    const apiRes = http.get(`${BASE_URL}/public/crocodiles/`);
    const endTime = new Date();
    
    apiLatency.add(endTime - startTime);
    
    const apiSuccess = checkResponse(apiRes, {
      'api status is 200': (r) => r.status === 200,
      'api returns data': (r) => r.json().length > 0
    }, 'API Request');

    if (!apiSuccess) {
      failedRequests.add(1);
    }
  });

  sleep(2);
}