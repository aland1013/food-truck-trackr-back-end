const request = require('supertest');
const server = require('../api/server');
const db = require('../data/db-config');

describe('diners-router', () => {
  let res = {};
  let dinerId = null;
  let token = '';

  beforeAll(async () => {
    const diner = await request(server).post('/api/auth/login').send({
      username: 'diner1',
      password: 'password'
    });

    token = diner.body.token;
    dinerId = diner.body.diner.dinerId;
  });

  describe('GET /api/diners', () => {
    beforeAll(async () => {
      res = await request(server).get('/api/diners');
    });

    it('should return 200', () => {
      expect(res.status).toBe(200);
    });

    it('should return a JSON object', () => {
      expect(res.type).toBe('application/json');
    });
  });

  describe('GET /api/diners/:id', () => {
    beforeAll(async () => {
      res = await request(server)
        .get(`/api/diners/${dinerId}`)
        .set('Authorization', `Bearer ${token}`);
    });

    it('should return 200', () => {
      expect(res.status).toBe(200);
    });

    it('should return a JSON object', () => {
      expect(res.type).toBe('application/json');
    });
  });

  describe('PUT /api/diners/:id', () => {
    beforeAll(async () => {
      res = await request(server)
        .put(`/api/diners/${dinerId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentLocation: 'earth'
        });
    });

    it('should return a JSON object', () => {
      expect(res.type).toBe('application/json');
    });

    it('should return a diner with location earth', () => {
      expect(res.body.currentLocation).toBe('earth');
    });
  });

  describe('GET /api/diners/:id/favoriteTrucks', () => {
    beforeAll(async () => {
      res = await request(server)
        .get(`/api/diners/100001/favoriteTrucks`)
        .set('Authorization', `Bearer ${token}`);
    });

    it('should return 200', () => {
      expect(res.status).toBe(200);
    });

    it('should return a JSON object', () => {
      expect(res.type).toBe('application/json');
    });
  });

  describe('POST /api/diners/:id/favoriteTrucks', () => {
    beforeAll(async () => {
      res = await request(server)
        .post(`/api/diners/100002/favoriteTrucks`)
        .set('Authorization', `Bearer ${token}`)
        .send({ truckId: 100002 });
    });

    it('should return 201', () => {
      expect(res.status).toBe(201);
    });

    it('should return a JSON object', () => {
      expect(res.type).toBe('application/json');
    });
  });
});
