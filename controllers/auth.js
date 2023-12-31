const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res=response) => {

    const { email, password } = req.body;
    console.log(email, password);

    try {
        // Verificar Email
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB){
            return res.status(400).json({ok: false, msg: 'No valido'});
        }

        // Verificar password
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if (!validPassword) {
            return res.status(400).json({ok: false, msg: 'Contraseña no valida'})
        }

        // Generar JWT
        const token = await generarJWT( usuarioDB.id );

        res.json({ok: true, token});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ok: false, msg: 'Error inesperado al autorizar usuario'});
    }
}

module.exports = {
    login
}