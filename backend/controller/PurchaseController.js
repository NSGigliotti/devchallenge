const User = require('../models/User')
const Item = require('../models/Item')

const getToken = require('../helpers/get-token')
const getUserbyToken = require('../helpers/get-user-by-token')


module.exports = class PurchaseController {
    static async addCar(req, res) {

        const idItem = req.params.id

        const { amount } = req.body

        //? get user from token
        const token = getToken(req)
        const user = await getUserbyToken(token)

        const item = await Item.findOne({ _id: idItem }).sort('-creatdAt')

        if (!user) {
            res.status(422).json({ message: "usuario invalido" })
            return
        }

        if (!amount) {
            res.status(422).json({ message: "Erro, quantidade nao especificada" })
        }

        if (!item) {
            res.status(422).json({ message: "Item nao encontrado" })
            return
        }

        user.shopping.push({ amount, item })

        
        try {
            await User.findOneAndUpdate({ _id: user.id }, { $set: user })
            res.status(200).json({ message: "Item adicionado ao carrinho" })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }
}