const mongoose = require('mongoose');

const dbConnection = async () =>{

    try {

        await mongoose.connect(process.env.DB_CNN);

        console.log('BDD Online');

    } catch (err) {
        console.log(err);
        throw new Error('Error al iniciar BDD');
    }

}

module.exports = {
    dbConnection: dbConnection
}