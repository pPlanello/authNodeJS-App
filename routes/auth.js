const { Router } = require('express');
const { createUser, loginUser, reNewToken } = require('../controllers/auth.js');

const router = Router();

/**
 * Create new user
 */
router.post('/new', createUser);

/**
 * Login user
 */
 router.post('/', loginUser);

/**
 * Validar y revalidar token
 */
 router.get('/renew', reNewToken);

module.exports = router;