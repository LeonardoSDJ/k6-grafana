import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { Trend, Counter } from 'k6/metrics';
import { checkResponse } from '../lib/utils.js';
import { standardThresholds } from '../config/thresholds.js';

const getLatency = new Trend('get_latency');
const postLatency = new Trend('post_latency');
const apiErrors = new Counter('api_errors');

export const options = {
  stages: [
    { duration: '1m', target: 20 },   // ramp-up to 20 users
    { duration: '3m', target: 20 },   // steady at 20 users
    { duration: '1m', target: 0 },    // ramp-down to 0 users
  ],
  thresholds: {
    ...standardThresholds,
    'get_latency': ['p(95)<400'],
    'post_latency': ['p(95)<600'],
    'api_errors': ['count<5'],
  },
};

export default function () {
  const BASE_URL = 'https://jsonplaceholder.typicode.com';
  
  group('API GET Requests', function () {
    const startTime = new Date();
    const res = http.get(`${BASE_URL}/posts`);
    getLatency.add(new Date() - startTime);
    
    const success = checkResponse(res, {
      'status is 200': (r) => r.status === 200,
      'response has data': (r) => r.json().length > 0,
    }, 'GET API');
    
    if (!success) apiErrors.add(1);
  });
  
  sleep(1);
  
  group('API POST Requests', function () {
    const payload = JSON.stringify({
      title: 'Test Post',
      body: 'This is a test post body',
      userId: Math.floor(Math.random() * 10) + 1,
    });
    
    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    const startTime = new Date();
    const res = http.post(`${BASE_URL}/posts`, payload, params);
    postLatency.add(new Date() - startTime);
    
    const success = checkResponse(res, {
      'status is 201': (r) => r.status === 201,
      'response has id': (r) => r.json().id !== undefined,
    }, 'POST API');
    
    if (!success) apiErrors.add(1);
  });
  
  sleep(2);
} 