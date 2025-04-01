import http from 'k6/http';
import { check, sleep } from 'k6';
import { standardThresholds } from '../config/thresholds.js';
import { checkResponse } from '../lib/utils.js';

export const options = {
    stages: [
        { duration: '30s', target: 10 },   // ramp-up to 10 users
        { duration: '1m', target: 10 },    // steady at 10 users
        { duration: '30s', target: 20 },   // ramp-up to 20 users
        { duration: '1m', target: 20 },    // steady at 20 users
        { duration: '30s', target: 0 },    // ramp-down to 0 users
    ],
    thresholds: {
        ...standardThresholds
    },
};

export default function () {
    const BASE_URL = 'https://test.k6.io';

    // Example site page navigation
    const homePage = http.get(`${BASE_URL}/`);
    checkResponse(homePage, {
        'homepage status is 200': (r) => r.status === 200,
    }, 'Home Page');

    sleep(1);

    // Login to example application
    const loginRes = http.post(`${BASE_URL}/login`, {
        username: 'test_user',
        password: 'secret',
    });
    
    checkResponse(loginRes, {
        'login successful': (r) => r.status < 400
    }, 'Login');

    sleep(1);

    // Query example API
    const apiRes = http.get(`${BASE_URL}/public/crocodiles/`);
    checkResponse(apiRes, {
        'api status is 200': (r) => r.status === 200,
    }, 'API Request');

    sleep(2);
}