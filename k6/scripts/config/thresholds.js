/**
 * Standard thresholds for most tests
 */
export const standardThresholds = {
  http_req_duration: ['p(95)<500', 'p(99)<1500'],
  http_req_failed: ['rate<0.05'],
  'success_rate': ['rate>0.95']
};

/**
 * Stricter thresholds for critical paths
 */
export const strictThresholds = {
  http_req_duration: ['p(90)<300', 'p(95)<500', 'p(99)<1000'],
  http_req_failed: ['rate<0.01'],
  'success_rate': ['rate>0.99']
}; 