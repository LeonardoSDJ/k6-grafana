import http from 'k6/http';
import { check, sleep } from 'k6';
import { checkResponse } from '../lib/utils.js';

export default function () {
    // K6 example application (test.k6.io)
    let res = http.get('https://test.k6.io/');

    checkResponse(res, {
        'status is 200': (r) => r.status === 200,
        'page contains title': (r) => r.body.includes('Welcome to the k6.io demo site!'),
    }, 'Home Page');

    sleep(1);
}