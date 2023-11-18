//const { Int32 } = require('mongodb');
const mongoose = require('mongoose')

const producSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please enter a product name"]
        },
        description: {
            type: String,
            required: true,
            default: '-Empty description-'
        },
        price: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', producSchema);

module.exports = Product;