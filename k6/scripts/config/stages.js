export const smokeTestStages = [
  { duration: '30s', target: 3 }
];

export const loadTestStages = [
  { duration: '1m', target: 20 },
  { duration: '3m', target: 20 },
  { duration: '1m', target: 0 }
];

export const stressTestStages = [
  { duration: '2m', target: 50 },
  { duration: '5m', target: 50 },
  { duration: '2m', target: 100 },
  { duration: '5m', target: 100 },
  { duration: '2m', target: 0 }
]; 