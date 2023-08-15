const mongoose = require('../db/conn')
const { Schema } = mongoose

const Purchase = mongoose.model(
    'Purchase',
    new Schema({
        user: {
            type: Object,
            required: true,
        },
        purchases: {
            type: Array,
            required: true,
        },
        payment: {
            type: Boolean,
            require: true,
        },
        Delivered: {
            type: Boolean,
            require: true
        }
    })
)

module.exports = Purchase