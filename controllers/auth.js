const { response } = require('express');


const createUser = (req, res = response) => {
    const { email, name, password } = req.body;

    return res.json({
        ok: true,
        msg: 'Creado el usuario'
    })
};


const loginUser = (req, res = response) => {
    const { email, password } = req.body;

    return res.json({
        ok: true,
        msg: 'Login usuario'
    })
};

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