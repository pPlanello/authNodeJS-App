const { response } = require('express');
const { validationResult } = require('express-validator');

/**
 * POST -> Create user 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const createUser = (req, res = response) => {
    const { email, name, password } = req.body;

    return res.json({
        ok: true,
        msg: 'Creado el usuario'
    })
};

/**
 * POST -> Login User
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const loginUser = (req, res = response) => {

    const errors = validationResult( req );

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    const { email, password } = req.body;

    return res.json({
        ok: true,
        msg: 'Login usuario'
    })
};

/**
 * GET -> New Token
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const reNewToken = (req, res = response) => {
    return res.json({
        ok: true,
        msg: 'Renew token'
    })
}

module.exports = {
    createUser,
    loginUser,
    reNewToken
}