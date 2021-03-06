const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, reNewToken } = require('../controllers/auth.js');
const { validJWT } = require('../middlewares/valid-jwt.js');
const { validFields } = require('../middlewares/validations-fields.js');

const router = Router();

/**
 * Create new user
 */
router.post('/new',
    [
        check('name', 'El usuario es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').isLength({min: 6}),
        validFields
    ], createUser);

/**
 * Login user
 */
 router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').isLength({min: 6}),
        validFields
    ], loginUser);

/**
 * Validar y revalidar token
 */
 router.get('/renew', [
     validJWT
 ], reNewToken);

module.exports = router;