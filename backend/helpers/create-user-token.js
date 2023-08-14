const jwt = require('jsonwebtoken')

const createUserToken = async (user, req, res) => {

    //? createa token
    const token = jwt.sign({
        name: user.name,
        id: user._id,
        seller: user.seller
    }, "ABC123")

    //? return token
    res.status(200).json({
        message: "voce esta autenticado",
        token: token,
        userId: user._id
    })
}

module.exports = createUserToken