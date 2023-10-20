/*
    Ruta: /api/usuarios
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuarios, updateUsuario, deleteUsuario } = require('../controllers/usuarios');

const router = new Router();

// Traer usuarios desde BDD
router.get( '/', getUsuarios );

// Para validar usamos el Middleware de express-validator chack y un custom middleware validarCampos al insertar usuario en BDD
router.post( '/',
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El Email es obligatorio').isEmail(),
    validarCampos,
],
crearUsuarios );

// Actualizar usuario
router.put( '/:id',
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El Email es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos,
],
updateUsuario );

// Borrar usuario
router.delete( '/:id', deleteUsuario );

module.exports = router;