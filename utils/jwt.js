const jwt = require('jsonwebtoken');

const generateJWT = (id, name) => {
    const payload = {id, name};

    return new Promise( (resolve, reject) => {
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: process.env.EXPIRED_JWT,
        }, (err, token) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}


module.exports = {
    generateJWT
}