const {response} = require('express');
const bcrypt =require('bcryptjs');

const Usuario = require('../models/usuario');


const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({ok: true, usuarios});

}

const crearUsuarios = async (req, res = response) => {

    const {email, password} = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({ok: false, msg: 'El Email ya está registrado'})
        }

        const usuario = new Usuario(req.body);
        
        // Encriptar contraseña 
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        
        await usuario.save();

        res.json({ok: true, usuario});

    } catch (error) {
        console.log(error);
        res.status(500).json({ok: false, msg: 'Error inesperado al crear usuario... revisar logs'});
    };
}


const updateUsuario = async (req, res=response) => {

const uid = req.params.id;

try {

    const usuarioDB = await Usuario.findById( uid );

    if (!usuarioDB) {
        res.status(404).json({ok: false, msg: 'No existe un usuario con ese ID'});
    }

    // Actualizaciones
    const { password,google,email, ...campos } = req.body;

    if (usuarioDB.email !== email) {
        const existeEmail = await Usuario.findOne( { email } );
        if (existeEmail){
            return res.status(400).json({
                ok:false,
                msg:'Ya existe un usuario con ese Email'
            })
        }
    }

    campos.email = email;

    const usuarioActualizado =  await Usuario.findByIdAndUpdate( uid, campos, { new: true} );

    res.json({ok: true, usuario: usuarioActualizado});
    
} catch (error) {
    console.log(error);
        res.status(500).json({ok: false, msg: 'Error inesperado al actualizar usuario... revisar logs'});
}

}

const deleteUsuario = async (req, res=response) => {

    const uid = req.params.id;
    
    try {
    
        const usuarioDB = await Usuario.findById( uid );
    
        if (!usuarioDB) {
            res.status(404).json({ok: false, msg: 'No existe un usuario con ese ID'});
        }

        await Usuario.findByIdAndDelete( uid );
        
        res.json({ok: true, uid});
        
    } catch (error) {
        console.log(error);
            res.status(500).json({ok: false, msg: 'Error inesperado al borrar usuario... revisar logs'});
    }
    
    }


module.exports = {

    getUsuarios,
    crearUsuarios,
    updateUsuario,
    deleteUsuario
}
