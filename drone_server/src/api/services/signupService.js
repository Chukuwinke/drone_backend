const prisma = require('../../../prisma/index');

const credentialCheck = async(name, email, password, callSign) => {
    // Check request
    if(!name || !email || !password || !callSign){
        throw new Error('Please provide missing field')
    }

    // Create new user
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password,
            callSign
        }
    })
    return user;
    
}

module.exports = credentialCheck;