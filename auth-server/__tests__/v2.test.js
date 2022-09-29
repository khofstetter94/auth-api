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

describe('V2 (Authenticated API Routes)', () => {
  test('POST /api/v2/:model with a bearer token that has create permissions adds an item to the DB and returns an object with the added item', async () => {
  });

  test('GET /api/v2/:model with a bearer token that has read permissions returns a list of :model items', async () => {
  });

  test('GET /api/v2/:model/ID with a bearer token that has read permissions returns a single item by ID', async () => {
  });

  test('PUT /api/v2/:model/ID with a bearer token that has update permissions returns a single, updated item by ID', async () => {
  });

  test('DELETE /api/v2/:model/ID with a bearer token that has delete permissions returns an empty object. Subsequent GET for the same ID should result in nothing found', async () => {
  });
});







