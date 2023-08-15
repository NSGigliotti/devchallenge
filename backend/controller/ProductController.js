const Category = require('../models/Category')
const Item = require('../models/Item')
const ObejectId = require('mongoose').Types.ObjectId

const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')


module.exports = class ProductController {
    static async registerCategory(req, res) {

        const { name } = req.body

        const nameLower = name.toLowerCase()


        //? check if category exists
        const categoryExists = await Category.findOne({ name: nameLower })

        if (categoryExists != null) {
            res.status(422).json({ message: 'Categoria ja existente' })
            return
        }

        //? create a new category
        const category = new Category({
            name: nameLower
        })

        try {
            const newCategory = await category.save()
            res.status(201).json({
                message: 'Categoria criada',
                newCategory
            })
        } catch (error) {
            res.status(500).json({ message: error })
        }

    }

    static async registerItem(req, res) {

        const { name, description, price, brand, stock, category } = req.body

        const images = req.files

        if (!name) {
            res.status(422).json({ message: 'Nome do item obrigatorio' })
            return
        }

        if (!description) {
            res.status(422).json({ message: 'descriçao obrigatoria' })
            return
        }

        if (!price) {
            res.status(422).json({ message: 'preço obrigatiorio' })
            return
        }

        if (!category) {
            res.status(422).json({ message: 'Categorias obrigatorioas' })
            return
        }

        if (!stock) {
            res.status(422).json({ message: 'Estoque necessario' })
            return
        }

        //? images upload
        if (images.length === 0) {
            res.status(422).json({ message: "A imagem e obrigatorio" })
            return
        }

        //? get item owner
        const token = getToken(req)
        const user = await getUserByToken(token)


        const nameLower = name.toLowerCase()


        //? Create a item
        const item = new Item({
            name: nameLower,
            description: description,
            price: price,
            category: category,
            image: [],
            brand: brand,
            stock: stock,
            seller: {
                _id: user._id,
                name: user.name,
                phone: user.phone,
            }

        })

        images.map((image) => {
            item.images.push(image.filename)
        })

        try {
            await item.save()
            res.status(200).json({ message: "produto cadastrado com sucesso" })
            return
        } catch (error) {
            res.status(500).json({ message: error })
        }

    }

    static async editItem(req, res) {

        const id = req.params.id

        //? check if id is valid
        if (!ObejectId.isValid(id)) {
            res.status(422).json({ message: "Id invalido" })
            return
        }

        const { name, description, price, brand, stock, category } = req.body

        const images = req.files

        const item = await Item.findOne({ _id: id })

        const updatedData = {}


        //? check if logged in yser registered the item
        const token = getToken(req)
        const user = await getUserByToken(token)


        if (item.user._id.toString() !== user._id.toString()) {
            res.status(422).json({ message: "Houve um erro ao processar sua soliticação" })
            return
        }

        if (!name) {
            res.status(422).json({ message: 'Nome do item obrigatorio' })
            return
        } else {
            updatedData.name = name.toLowerCase()
        }

        if (!description) {
            res.status(422).json({ message: 'descriçao obrigatoria' })
            return
        } else {
            updatedData.description = description
        }

        if (!price) {
            res.status(422).json({ message: 'preço obrigatiorio' })
            return
        } else {
            updatedData.price = price
        }


        if (!category) {
            res.status(422).json({ message: 'Categorias obrigatorioas' })
            return
        } else {
            updatedData.category = category
        }

        if (!stock) {
            res.status(422).json({ message: 'Estoque necessario' })
            return
        } else {
            updatedData.stock = stock
        }

        await Item.findByIdAndUpdate(id, updatedData)

        res.status(200).json({ message: 'Item atualisado com sucesso' })
    }


    static async getAll(req, res) {

        const items = await Item.find().sort('-creatdAt')

        res.status(200).json({ items: items })
    }

    static async getCategory(req, res) {

        const category = req.params.category

        const items = await Item.find({ category: { $gte: category } }).sort('-creatdAt')

        res.status(200).json({ items: items })
    }

    static async getSearch(req, res) {

        const search = req.params.search

        const searchLower = search.toLowerCase()

        const items = await Item.find({ name: searchLower }).sort('-creatdAt')

        res.status(200).json({ item: items })
    }
}