import app from '../../app';
import supertest from 'supertest';
import { expect } from 'chai';
import shortid from 'shortid';

let firstUserIdTest = ''; // will later hold a value returned by our API
const firstUserBody = {
    email: `test+${shortid.generate()}@test.com`,
    password: 'Pww2!#11#@1',
};

const newFirstName = 'Test';
const newFirstName2 = '1';
const newLastName2 = '1';

describe('users CRUD endpoints', function () {
    let request: supertest.SuperAgentTest;
    before(function () {
        request = supertest.agent(app);
    });
    after(function (done) {
        done();
        // shut down the Express.js server, then tell Mocha we're done:
        app.close(() => {
        });
    });

    it('should allow a POST to /users', async function () {
        const res = await request.post('/users').send(firstUserBody);

        expect(res.status).to.equal(201);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.be.a('string');
        firstUserIdTest = res.body.id;
    });

    it('should allow a GET from /users/:userId ', async function () {
        const res = await request
            .get(`/users/${firstUserIdTest}`)
            .send();
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.be.a('string');
        expect(res.body.id).to.equal(firstUserIdTest);
        expect(res.body.email).to.equal(firstUserBody.email);
    });

    it('should allow a PATCH to /users/:userId', async function () {
            const res = await request
                .patch(`/users/${firstUserIdTest}`)
                .send({
                    firstName: newFirstName,
                });
            expect(res.status).to.equal(204);
    });

    it('should disallow a PUT to /users/:userId with an nonexistent ID', async function () {
            const res = await request
                .put(`/users/i-do-not-exist`)
                .send({
                    email: firstUserBody.email,
                    password: firstUserBody.password,
                    firstName: 'Test',
                    lastName: '1',
                    permissionFlags: 9,
                });
            expect(res.status).to.equal(404);
    });

    it('should disallow a PUT to /users/:userId trying to change the permission flags of invalid-id', async function () {
            const res = await request
                .put(`/users/invalid-id`)
                .send({
                    email: firstUserBody.email,
                    password: firstUserBody.password,
                    firstName: 'Test',
                    lastName: '1',
                    permissionFlags: 10,
                });
            expect(res.status).to.equal(404);
    });

    it('should disallow a PUT to /users/:userId trying to use invalid data', async function () {
            const res = await request
                .put(`/users/${firstUserIdTest}`)
                .send({
                    email: firstUserBody.email,
                    password: firstUserBody.password,
                    firstName: 999,
                    lastName: '1',
                    permissionFlags: 10,
                });
            expect(res.status).to.equal(400);
            expect(res.body.errors).to.be.an('array');
            expect(res.body.errors).to.have.length(1);
    });

    it('should allow a PUT to /users/:userId/permissionFlags/2 for testing', async function () {
            const res = await request
                .put(`/users/${firstUserIdTest}/permissionFlags/2`)
                .send({});
            expect(res.status).to.equal(404);
    });

    it('should allow a PUT to /users/:userId to change first and last names', async function () {
                const res = await request
                    .put(`/users/${firstUserIdTest}`)
                    .send({
                        email: firstUserBody.email,
                        password: firstUserBody.password,
                        firstName: newFirstName2,
                        lastName: newLastName2,
                        permissionFlags: 200,
                    });
                expect(res.status).to.equal(204);
     });

     it('should allow a GET from /users/:userId and should have a new full name', async function () {
                const res = await request
                    .get(`/users/${firstUserIdTest}`)
                    .send();
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.be.an('object');
                expect(res.body.id).to.be.a('string');
                expect(res.body.firstName).to.equal(newFirstName2);
                expect(res.body.lastName).to.equal(newLastName2);
                expect(res.body.email).to.equal(firstUserBody.email);
                expect(res.body.id).to.equal(firstUserIdTest);
      });

      it('should allow a DELETE from /users/:userId', async function () {
                const res = await request
                    .delete(`/users/${firstUserIdTest}`)
                    .send();
                expect(res.status).to.equal(204);
      });
});
