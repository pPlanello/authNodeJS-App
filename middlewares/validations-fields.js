const { response } = require("express");
const { validationResult } = require("express-validator"); 

const validFields = (req, res = response, next) => {
    const errors = validationResult( req );

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    // If no errors continue
    next();
}

module.exports = {
    validFields
}