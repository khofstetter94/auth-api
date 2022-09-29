'use strict';

const supertest = require('supertest');
const { server } = require('../src/server');
const { db } = require('../src/auth/models');
const request = supertest(server);

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

describe('V1 (Unauthenticated API) routes', () => {
  test('POST /api/v1/:model adds an item to the DB and returns an object with the added item', async () => {
  });

  test('GET /api/v1/:model returns a list of :model items', async () => {
  });

  test('GET /api/v1/:model/ID returns a single item by ID', async () => {
  });

  test('PUT /api/v1/:model/ID returns a single, updated item by ID', async () => {
  });

  test('DELETE /api/v1/:model/ID returns an empty object. Subsequent GET for the same ID should result in nothing found', async () => {
  });
});
