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

describe('AUTH Routes', () => {
  test('POST /signup creates a new user and sends an object with the user and the token to the client', async () => {
    let response = await request.post('/signup').send({
      username: 'tester',
      password: 'pass123',
      role: 'admin'
    });

    console.log('Response Body', response.body);
    expect(response.status).toEqual(201);
    expect(response.body.user.username).toEqual('tester');
    expect(response.body.user.password).toBeTruthy();
    expect(response.body.user.password).not.toEqual('pass123');
  });

  test('POST /signin with basic authentication headers logs in a user and sends an object with the user and the token to the client', async () => {
    const username = 'tester';
    const password = 'pass123';

    await request.post('/signup').send({
      username: 'tester',
      password: 'pass123',
      role: 'admin'
    });

    const response = await request.post('/signin').auth(username, password);

    console.log('Response Body', response.body);
    expect(response.status).toEqual(200);
    expect(response.body.token).toBeTruthy();
    expect(response.body.user).toBeTruthy();
  });
});
