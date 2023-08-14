const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserbyToken = require('../helpers/get-user-by-token')

module.exports = class UserController {
    static async register(req, res) {

        const { name, email, phone, password, confirmpassoword, seller = false } = req.body

        //? validations

        if (!email) {
            res.status(422).json({ message: 'O e-mail e obrigatorio' })
            return
        }
        if (!validarEmail(email)) {
            res.status(422).json({ message: 'Email invalido' })
            return
        }

        if (!name) {
            res.status(422).json({ message: 'O nome e obrigatorio' })
            return
        }

        if (!phone) {
            res.status(422).json({ message: 'O telefone e obrigatorio' })
            return
        }

        if (!password) {
            res.status(422).json({ message: 'A senha e obrigatorio' })
            return
        }

        if (!confirmpassoword) {
            res.status(422).json({ message: 'A confirmaçao de senha e obrigatorio' })
            return
        }

        if (password !== confirmpassoword) {
            res.status(422).json({ message: 'A senha e aconfirmaçao desenha tem que ser iguais' })
            return
        }


        //? check if user exists
        const userExists = await User.findOne({ email: email })


        if (userExists) {
            res.status(422).json({ message: 'Este e-mail ja esta sendo usado' })
            return
        }

        //? create a password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //? create a user
        const user = new User({
            name: name,
            email: email,
            phone: phone,
            password: passwordHash,
            seller: seller
        })


        try {
            const newUser = await user.save()
            await createUserToken(newUser, req, res)
        } catch (error) {
            res.status(500).json({ message: error })
        }

    }


    static async login(req, res) {

        const { email, password } = req.body

        if (!email) {
            res.status(422).json({ message: 'O e-mail obrigatorio' })
            return
        }

        if (!password) {
            res.status(422).json({ message: 'Senha obrigatoria' })
            return
        }

        //? check if user exist
        const user = await User.findOne({ email: email })

        if (!user) {
            res.status(422).json({ message: 'Email invalido' })
            return
        }

        //? check if password mach with db password
        const checkpPassword = await bcrypt.compare(password, user.password)

        if (!checkpPassword) {
            res.status(422).json({ message: 'Senha invalido' })
            return
        }

        await createUserToken(user, req, res)

    }

    static async checkUser(req, res) {

        let currentUser

        if (req.headers.authorization) {

            const token = getToken(req)
            const decode = jwt.verify(token, 'ABC123')

            currentUser = await User.findById(decode.id)

            currentUser.password = undefined
        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }

    static async editUser(req, res) {

        const id = req.params.id

        //? check if user exist
        const token = getToken(req)
        const user = await getUserbyToken(token)


        const { name, email, phone, password, confirmpassoword } = req.body

        let image = ''

        if (req.file) {
            user.image = req.file.filename
        }

        //? validations

        if (!name) {
            res.status(422).json({ message: 'O nome e obrigatorio' })
            return
        }

        user.name = name

        if (!email) {
            res.status(422).json({ message: 'O e-mail e obrigatorio' })
            return
        }

        //? check if email has already taken
        const userExists = await User.findOne({ email: email })

        if (user.email !== email && userExists) {
            res.status(422).json({ message: "Por favor utilize outro email" })
            return
        }

        user.email = email

        if (!phone) {
            res.status(422).json({ message: 'O telefone e obrigatorio' })
            return
        }

        user.phone = phone


        if (password != confirmpassoword) {
            res.status(422).json({ message: 'As senhas nao conferem' })
            return
        } else if (password === confirmpassoword && password != null) {
            //? create a password
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash
        }


        try {
            //? return user updated data
            await User.findOneAndUpdate(
                { _id: user.id },
                { $set: user },
                { new: true }
            )
        } catch (error) {
            res.status(500).json({ message: err })
        }
    }
}