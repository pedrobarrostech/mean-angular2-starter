import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;

describe('## Cat APIs', () => {
  let cat = {
    name: 'KK123',
    age: 1,
    weight: 10
  };

  describe('# POST /api/cats', () => {
    it('should create a new cat', (done) => {
      request(app)
        .post('/api/cats')
        .send(cat)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(cat.name);
          expect(res.body.age).to.equal(cat.age);
          expect(res.body.weight).to.equal(cat.weight);
          cat = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/cats/:catId', () => {
    it('should get cat details', (done) => {
      request(app)
        .get(`/api/cats/${cat._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(cat.name);
          expect(res.body.age).to.equal(cat.age);
          expect(res.body.weight).to.equal(cat.weight);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when cat does not exists', (done) => {
      request(app)
        .get('/api/cats/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/cats/:catId', () => {
    it('should update cat details', (done) => {
      cat.catname = 'KK';
      request(app)
        .put(`/api/cats/${cat._id}`)
        .send(cat)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('KK123');
          expect(res.body.age).to.equal(cat.age);
          expect(res.body.weight).to.equal(cat.weight);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/cats/', () => {
    it('should get all cats', (done) => {
      request(app)
        .get('/api/cats')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/cats/', () => {
    it('should delete cat', (done) => {
      request(app)
        .delete(`/api/cats/${cat._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('KK123');
          expect(res.body.age).to.equal(cat.age);
          expect(res.body.weight).to.equal(cat.weight);
          done();
        })
        .catch(done);
    });
  });
});
