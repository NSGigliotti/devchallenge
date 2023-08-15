const User = require('../models/User')
const Item = require('../models/Item')
const Purchase = require('../models/Purchase')
var valid = require("card-validator");
const bcrypt = require('bcrypt')



const getToken = require('../helpers/get-token')
const getUserbyToken = require('../helpers/get-user-by-token')


module.exports = class PurchaseController {
    static async addCar(req, res) {

        const idItem = req.params.id

        const { amount } = req.body

        var checkItemCar = false

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


        for (var i = 0; i <= user.shopping.length; i++) {

            if (user.shopping[i]?.item._id.valueOf() === idItem) {
                user.shopping[i].amount += amount
                checkItemCar = true
            }
        }

        if (!checkItemCar) {
            user.shopping.push({ amount, item })
        }


        try {
            await User.findOneAndUpdate({ _id: user.id }, { $set: user }, { new: true })
            res.status(200).json({ message: "Item adicionado ao carrinho" })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    static async removeAndDecrementItem(req, res) {

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


        for (var i = 0; i <= user.shopping.length; i++) {

            if (user.shopping[i]?.item._id.valueOf() === idItem) {
                user.shopping[i].amount -= amount
                if (user.shopping[i].amount === 0) {
                    user.shopping.splice(i, 1);
                }
            }
        }


        try {
            await User.findOneAndUpdate({ _id: user.id }, { $set: user }, { new: true })
            res.status(200).json({ message: "Item removido ao carrinho" })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    static async purchaseComplete(req, res) {

        const { creditCardNumber, creditCardName, cvv, expirationDate } = req.body

        //? get user from token
        const token = getToken(req)
        const user = await getUserbyToken(token)


        const numberValidation = valid.number(creditCardNumber)

        const cvvValidation = valid.cvv(cvv)

        const dataValidation = valid.expirationDate(expirationDate)



        if (!numberValidation.isValid) {
            res.status(422).json({ message: "Numero do cartao invalido" })
            return
        }

        if (!creditCardName) {
            res.status(422).json({ message: "Nome do cartao invalido" })
            return
        }

        if (!dataValidation.isValid) {
            res.status(422).json({ message: "Data invalida" })
            return
        }

        if (!cvv) {
            res.status(422).json({ message: "Codigo de segurança necessário" })
            return
        }

        if (!cvvValidation.isValid) {
            res.status(422).json({ message: "Codigo de segurança invalido" })
            return
        }

        var purchaseAmount = 0;

        for (var i = 0; i < user.shopping.length; i++) {
            var x = user.shopping[i]?.amount * user.shopping[i]?.item.price
            purchaseAmount += x
        }

        //?cryptography Credit Card Number and cvv
        const salt = await bcrypt.genSalt(12)
        const creditCardNumberHash = await bcrypt.hash(creditCardNumber.toString(), salt)
        const cvvNumberHash = await bcrypt.hash(cvv.toString(), salt)

        const paymentData = {
            creditCardNumber: creditCardNumberHash,
            cvv: cvvNumberHash,
            expirationDate: expirationDate,
            name: creditCardName
        }


        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 5);
        const formattedDate = currentDate.toLocaleDateString();


        const purchase = new Purchase({
            user: user,
            purchases: user.shopping,
            paymentData: paymentData,
            paymentDeadline: formattedDate,
            purchaseAmount: purchaseAmount,
            payment: false,
            delivered: false
        })

        user.shopping = []

        try {
            await purchase.save()
            await User.findOneAndUpdate({ _id: user.id }, { $set: user }, { new: true })
            res.status(200).json({ message: "Compra concluida com sucesso, aguardando confirmçao do pagamento" })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    static async purchasesHistoric(req, res) {

        //? get user from token
        const token = getToken(req)
        const user = await getUserbyToken(token)

        const historic = await Purchase.find({ "user._id": user._id }).sort('-creatdAt')

        res.status(200).json({ item: historic })

    }
}