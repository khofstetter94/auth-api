'use strict';

const supertest = require('supertest');
const { server } = require('../src/server');
const { db } = require('../src/auth/models');
const request = supertest(server);

let bearerToken;

beforeEach(async () => {
  await db.sync();
  const newUser = {
    username: 'kc',
    password: 'pass',
    role: 'admin',
  };
  await request.post('/signup').send(newUser);
  let response = await request.post('/signin').auth(newUser.username, newUser.password);
  bearerToken = response.body.token;
});

afterEach(async () => {
  await db.drop();
});

describe('V2 (Authenticated API Routes)', () => {
  test('POST /api/v2/:model with a bearer token that has create permissions adds an item to the DB and returns an object with the added item', async () => {
    const newItem = {
      name: 'tester',
      color: 'green',
      size: 'large'
    };
    let response = await request.post('/api/v1/clothes')
      .send(newItem)
      .set('Authorization', `Bearer ${bearerToken}`);

    console.log('Response Body', response.body);
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual(newItem.name);
    expect(response.body.color).toEqual(newItem.color);
    expect(response.body.size).toEqual(newItem.size);
  });

  test('GET /api/v2/:model with a bearer token that has read permissions returns a list of :model items', async () => {
    let response = await request.get('/api/v1/clothes').set('Authorization', `Bearer ${bearerToken}`);

    console.log('Response Body', response.body);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });

  test('GET /api/v2/:model/ID with a bearer token that has read permissions returns a single item by ID', async () => {
    const newItem = {
      name: 'shirt',
      color: 'green',
      size: 'large',
    };
    let response = await request.post('/api/v1/clothes').send(newItem).set('Authorization', `Bearer ${bearerToken}`);

    const { id } = response.body;
    response = await request.get(`/api/v1/clothes/${id}`).set('Authorization', `Bearer ${bearerToken}`);

    console.log('Response Body', response.body);
    expect(response.body.name).toEqual(newItem.name);
    expect(response.body.color).toEqual(newItem.color);
    expect(response.body.size).toEqual(newItem.size);
    expect(response.body.id).toEqual(id);
  });

  test('PUT /api/v2/:model/ID with a bearer token that has update permissions returns a single, updated item by ID', async () => {
    const newItem = {
      name: 'shirt',
      color: 'green',
      size: 'large',
    };
    let response = await request.post('/api/v1/clothes').send(newItem).set('Authorization', `Bearer ${bearerToken}`);
    const { id } = response.body;

    console.log('Response Body', response.body);
    expect(response.body.name).toEqual(newItem.name);
    expect(response.body.color).toEqual(newItem.color);
    expect(response.body.size).toEqual(newItem.size);
    expect(response.body.id).toEqual(id);

    const newName = 'jeans';
    response = await request.put(`/api/v1/clothes/${id}`).send({
      ...newItem,
      name: newName,
    }).set('Authorization', `Bearer ${bearerToken}`);

    console.log('Response Body', response.body);
    expect(response.body.name).toEqual(newName);
    expect(response.body.color).toEqual(newItem.color);
    expect(response.body.size).toEqual(newItem.size);
    expect(response.body.id).toEqual(id);
  });

  test('DELETE /api/v2/:model/ID with a bearer token that has delete permissions returns an empty object. Subsequent GET for the same ID should result in nothing found', async () => {
    const newItem = {
      name: 'shirt',
      color: 'green',
      size: 'large',
    };
    let response = await request.post('/api/v1/clothes').send(newItem).set('Authorization', `Bearer ${bearerToken}`);
    const { id } = response.body;

    // get to make sure it is there
    response = await request.get(`/api/v1/clothes/${id}`).set('Authorization', `Bearer ${bearerToken}`);
    expect(response.body.name).toEqual(newItem.name);

    response = await request.del(`/api/v1/clothes/${id}`).set('Authorization', `Bearer ${bearerToken}`);
    expect(response.body).toEqual(1);

    // get to make sure it's not there
    response = await request.get(`/api/v1/clothes/${id}`).set('Authorization', `Bearer ${bearerToken}`);
    expect(response.body).toEqual(null);
  });
});







