/**
 * @author Mohanraj V / Santhosh
 * @date  22-09-2023
 * @description Authentication Methods
 */


import * as auth from 'basic-auth';
import { validationResult } from 'express-validator';
import { response } from "../helper/commonResponseHandler";
import { clientError,errorMessage } from "../helper/ErrorMessage";

export let basicAuthUser = function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return response(req, res, "activity", 'Level-1', '', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    };

    var credentials = auth(req);
    console.log('credentials',!credentials);
    if (!credentials || credentials.name != process.env.basicAuthUser || credentials.pass != process.env.basicAuthKey) {
        res.setHeader('WWW-Authenticate', 'Basic realm="example"')
        return res.status(401).json({
            success: false,
            statusCode: 499,
            message: clientError.token.unauthRoute,
        });
    } else {
        next();
    }
}
