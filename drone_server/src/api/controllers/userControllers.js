// bring in prisma and cookie
const cookieToken = require('../../utils/cookieToken');
const credentialCheck = require('../services/signupService');
const loginCheck = require('../services/loginService')

exports.signUp = async(req, res, next) => {
    const {name, email, password, callSign} = req.body;
    try {
        
        const user = await credentialCheck(name, email, password, callSign)
        
        cookieToken(user, res);
    } catch (error) {
        throw new Error(error);
    }
}

exports.login = async(req, res, next) =>{
    const {email, password} = req.body;
    try {
        const user = await loginCheck(email, password);
        cookieToken(user, res)
        
    } catch (error) {
        throw new Error(error)
    }
}

exports.logout = async(req, res, next) => {
    try {
        res.clearCookie('token')
        res.json({
            success: true
        })
    } catch (error) {
        throw new Error(error)
    }
}