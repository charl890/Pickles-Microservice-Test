import { CommonRoutesConfig } from '../../common/common.routes.config';
import express from 'express';
import { body } from 'express-validator';
import EmailService from './email.service';

export class EmailServiceRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'EmailServiceRoutes');
    }

    configureRoutes() {
        this.app
            .route(`/sendEmail`)
            .post(
                body('sendTo').isEmail()
                    .isLength({ min: 5 })
                    .withMessage('Must include sendTo (5+ characters)'),
                body('sendFrom').isEmail()
                    .isLength({ min: 5 })
                    .withMessage('Must include sendFrom (5+ characters)'),
                body('subject').isString(),
                body('body').isString(),
                EmailService.sendEmail
            );

        return this.app;
    }
}
