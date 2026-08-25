import { createApp } from '@/app';
import type { Express } from 'express';
import request from 'supertest';

let appPromise: Promise<Express> | null = null;

// This function ensures that the Express app is created only once and reused across tests.
function getApp() {
  if (!appPromise) {
    appPromise = createApp();
  }
  return appPromise;
}

// This function creates a test client for making HTTP requests to the Express app.
export async function createTestClient() {
  const app = await getApp();
  return request(app);
}
