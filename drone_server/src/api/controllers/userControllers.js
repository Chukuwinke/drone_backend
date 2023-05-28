// bring in prisma and cookie

const prisma = require('../../../prisma/index');
const cookieToken = require('../../utils/cookieToken');


exports.signUp = async(req, res, next) => {
    try {
        const {name, email, password, callSign} = req.body;

        //check request
        if (!name || !email || !password || !callSign){
            throw new Error('one field is missing');
        }
        // Remember to create and call the service to generate a call sign here
        // and add it to the create user

        // create new user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
                callSign
            }
        })

        cookieToken(user, res);
    } catch (error) {
        throw new Error(error);
    }
}