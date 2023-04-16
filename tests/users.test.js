const request = require('supertest');
const app = require('../app');

require('dotenv').config();

let createdUserId;

describe('POST /users', () => {
  it('should create a new user', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'johndoe1@example.com',
      gender: 'male',
      status: 'active'
    };

    const res = await request(app)
      .post('/users')
      .send(newUser)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${process.env.ACCESS_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(newUser);

    createdUserId = res.body.id;
  });
});

describe('GET /users/:id', () => {
  it('should return user information by id', async () => {
    const id = createdUserId;
    const expectedUser = {
      id: id,
      name: 'John Doe',
      email: 'johndoe1@example.com',
      gender: 'male',
      status: 'active'
    };

    const res = await request(app)
      .get(`/users/${id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${process.env.ACCESS_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(expectedUser);
  });
});

describe('PATCH /users/:id', () => {
  it('should update user information by id', async () => {
  const id = createdUserId;
  const updatedUser = {
    name: 'John Doe',
    email: 'johndoe1@example.com',
    gender: 'male',
    status: 'active',
    id: id
  };
  
  const res = await request(app)
    .patch(`/users/${id}`)
    .send(updatedUser)
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${process.env.ACCESS_TOKEN}`);
  
  expect(res.statusCode).toBe(200);
  expect(res.body).toMatchObject(updatedUser);
  });
  });

describe('DELETE /users/:id', () => {
  it('should delete user by id', async () => {
  const id = createdUserId;
  
  const res = await request(app)
    .delete(`/users/${id}`)
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${process.env.ACCESS_TOKEN}`);
  
  expect(res.statusCode).toBe(200);
  });
  });



