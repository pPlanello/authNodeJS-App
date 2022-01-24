const { response } = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../utils/jwt');

/**
 * POST -> Create user 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const createUser = async (req, res = response) => {
    const { email, name, password } = req.body;

    try {
        // Verify email finding user in DB
        const user = await User.findOne({email: email});
        if (user) {
            return res.status(500).json({
                ok: false,
                msg: 'El usuario ya existe con el email: ' + email
            });
        }
        // Create new user
        const userDB = new User( req.body );

        // Hash password
        const salt = bcrypt.genSaltSync();
        userDB.password = bcrypt.hashSync(password, salt);

        // Generate JWT
        const token = await generateJWT(userDB.id, name);

        // Save in DB
        await userDB.save();

        // Send response
        return res.status(201).json({
            ok: true,
            id: userDB.id,
            name: userDB.name,
            token: token
        });
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

/**
 * POST -> Login User
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const loginUser = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        // Find user in DB
        const userDB = await User.findOne({ email });

        // Verify user
        if (!userDB) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ' + email + ' no existe'
            });
        }

        // Match password
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña introducida no es correcta'
            });
        }

        // Generate JWT
        const token = await generateJWT(userDB.id, userDB.name);

        // Send response
        return res.status(200).json({
            ok: true,
            id: userDB.id,
            name: userDB.name,
            token: token
        });
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

/**
 * GET -> New Token
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const reNewToken = async(req, res = response) => {
    const {id, name } = req;

    // Generate NEW JWT
    const token = await generateJWT(id, name);

    return res.json({
        ok: true,
        msg: 'Renew token',
        token,
        id,
        name
    })
}

module.exports = {
    createUser,
    loginUser,
    reNewToken
}