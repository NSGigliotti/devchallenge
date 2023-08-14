const Category = require('../models/Category')
const Item = require('../models/Item')

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
        
        console.log(images)

        //? images upload
        if (images.length === 0) {
            res.status(422).json({ message: "A imagem e obrigatorio" })
            return
        }

        //? get pet owner
        const token = getToken(req)
        const user = await getUserByToken(token)



        // //? Create a item
        // const item = new Item({
        //     name: name,
        //     description: description,
        //     price: price,
        //     category: category,
        //     image: [],
        //     brand: brand,
        //     stock: stock,
        //     seller: {
        //         _id: user._id,
        //         name: user.name,
        //         phone: user.phone,
        //     }

        // })

        // images.map((image) => {
        //     item.images.push(image.filename)
        // })

        // try {
        //     await item.save()
        //     res.status(200).json({ message: "produto cadastrado com sucesso" })
        //     return
        // } catch (error) {
        //     res.status(500).json({ message: error })
        // }

    }
}