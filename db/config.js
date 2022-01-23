const  mongoose = require("mongoose");

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB Online')
    } catch(error) {
        console.error(error);
        throw new Error('')
    }
}

module.exports = {
    dbConnection
}