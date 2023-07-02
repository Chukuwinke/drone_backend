const prisma = require('../../../prisma/index');
const jwt = require('jsonwebtoken');

const isLoggedIn = async(req, res, next) =>{
    const token = req.cookie.token
    try {
        if (!token){
            res.send('Please login')
            throw new Error('you are not loged in')
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded == undefined){
            throw new Error("user cookie not valid")
        }

        req.user = await prisma.user.findUnique({
            where:{
                id: decoded.userId
            }
        })

        next()

    } catch (error) {
        throw new Error(error)
    }
} 

module.exports = isLoggedIn;

