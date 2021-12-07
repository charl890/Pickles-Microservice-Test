import app from '../../../app';
import supertest from 'supertest';
import { expect } from 'chai';
import shortid from 'shortid';

const EmailBody = {
    sendTo: `To-+${shortid.generate()}`,
    sendFrom: `From-+${shortid.generate()}`,
    subject: `Subject-+${shortid.generate()}`,
    body: `Body-+${shortid.generate()}`,
};

describe('email service endpoints', function () {
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

    it('should not allow a POST to non-existent /emailService', async function () {
        const res = await request.post('/emailService').send(EmailBody);

        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
    });
});
