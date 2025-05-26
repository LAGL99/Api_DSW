const jwsl = require('jsonwebtoken');

exports.authenticateToken =(req,res,next) =>{

    const token = req.headers.authorization;
    if (!token){
        return res.status(401).json({
            error: "No se proporciono token de acceso"
        });
    }
    jwsl.verify(token, 'secreto',(error, decoded)=>{
    if (error){
        return res.status(401).json({error:"TokenInvalido"});
    }
    req.userId=decoded.userId;
    next();
    })
}