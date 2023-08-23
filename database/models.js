const mongoose = require('mongoose')

const product_schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    product_class:{
        type:String,
        required:true,
        // enum:{
        //     value: ["natural sweetner", "unsweetned sweets", "health drinks", "health flour", "butter", "oil"],  // Iss list mei jo itmes hai wohi product_class allowed hai other error show kra denge
        //     message: `{VALUE} is not supported`
        // }
    },
    discount_price:{
        type:Number,
    },
    mrp:{
        type:Number,
        required:[true, 'Price must be provided']
    },
    launchedAt:{
        type:Date,
        default:Date.now()
    },
    rating:{
        type:Number,
        default:4.9
    },
    image:String
})

const Product = mongoose.model('Product',product_schema)

module.exports = Product