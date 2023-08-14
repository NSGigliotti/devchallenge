const mongoose = require('../db/conn')
const { Schema } = mongoose

const Item = mongoose.model(
    'Item',
    new Schema({
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            get: v => (v / 100).toFixed(2),
            set: v => v * 100,
            required: true,
        },
        images: {
            type: Array,
            required: true,
        },
        brand: {
            type: String
        },
        stock: {
            type: Number
        },
        category: {
            type: Array,
            required: true,
        },
        seller: Object
    }, { timestamps: true })
)

module.exports = Item