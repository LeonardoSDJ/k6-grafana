import { Counter, Rate, Trend } from 'k6/metrics';

// Reusable global metrics
export const errorCounter = new Counter('errors');
export const successRate = new Rate('success_rate');
export const apiLatency = new Trend('api_latency');
export const getLatency = new Trend('get_latency');
export const postLatency = new Trend('post_latency'); 