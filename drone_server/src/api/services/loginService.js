const prisma = require('../../../prisma/index');

const loginCheck = async(email, password) => {
    if (!email || !password){
        throw new Error('missing field');

    }

    // find a user in the db that hat the same email address as the email passed in 
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        throw new Error('user not found')
    }

    if (user.password !== password) {
        throw new Error('incorrect password')
    }

    return user
    
}

module.exports = loginCheck