const mongoose = require('../db/conn')
const { Schema } = mongoose

const Purchase = mongoose.model(
    'Purchase',
    new Schema({
        user: {
            type: Object,
            required: true,
        },
        paymentData: {
            type: Object,
            required: true,
        },
        purchases: {
            type: Array,
            required: true,
        },
        paymentDeadline: {
            type: String,
            require: true,
        },
        payment: {
            type: Boolean,
            require: true,
        },
        delivered: {
            type: Boolean,
            require: true
        },
        purchaseAmount: {
            type: Number,
            require: true
        }
    })
)

module.exports = Purchase