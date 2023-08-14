const mongoose = require('../db/conn')
const { Schema } = mongoose

const Category = mongoose.model(
    'Categories',
    new Schema({
        name: {
            type: String,
            required: true,
        }
    })
)

module.exports = Category