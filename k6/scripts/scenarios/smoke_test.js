import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter, Rate } from 'k6/metrics';
import { standardThresholds } from '../config/thresholds.js';

const errors = new Counter('errors');
const successRate = new Rate('success_rate');

export const options = {
    vus: 3,              // 3 virtual users
    duration: '30s',     // for 30 seconds
    thresholds: {
        ...standardThresholds,
        'success_rate': ['rate>0.9'],  // success rate should be above 90%
    }
};

export default function () {
    // Test K6's example API
    const res = http.get('https://test.k6.io/public/crocodiles/');

    // Check status and record metrics
    const success = check(res, {
        'status is 200': (r) => r.status === 200,
        'response body': (r) => r.body.indexOf('Crocodiles') !== -1,
    });

    // Update  metrics
    if (!success) {
        errors.add(1);
    }

    successRate.add(success);

    // Navigate to another page
    http.get('https://test.k6.io/');

    sleep(1);
}