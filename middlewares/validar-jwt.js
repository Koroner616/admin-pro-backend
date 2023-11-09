const jwt = require('jsonwebtoken');

const validarJWT = (req,res,next) => {
    //Leer token
    const token = req.header('x-token');

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        console.log(err)
        console.log(decoded) // bar
      });

    if (!token) {
        return res.status(401).json({
            ok:false,
            msg: 'No hay Token en la petición'
        });
    }

    try {
        const { uid } = jwt.verify( token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: 'Token no válido'
        })
    }
}

module.exports = {
    validarJWT
}