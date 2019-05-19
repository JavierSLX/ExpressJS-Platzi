const express = require('express');
const passport = require('passport');
const boom = require('boom');
const jwt = require('jsonwebtoken');
const api = express.Router();
const {config} = require('../../config');

//Basic strategy
require('../../utils/auth/strategies/basic');

api.post('/token', async (request, response, next) => {

    passport.authenticate('basic', (error, user) => {

        try
        {
            if(error || !user)
                next(boom.unauthorized());
            
            request.login(user, {session: false}, async (error) => {
                if(error)
                    next(error);

                const payload = {sub: user.username, email: user.email};
                const token = jwt.sign(payload, config.authJwt, {expiresIn: "15min"});

                return response.status(200).json({access_token: token});
            });
        }catch(error)
        {
            next(error);
        }
    })(request, response, next);
});

module.exports = api;