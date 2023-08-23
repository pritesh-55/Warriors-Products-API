require('dotenv').config()

const express = require('express')
const app = express()

const port = process.env.PORT || 5000

const connect_product_DB = require("./database/connection")

const Product = require("./database/models")

app.get('/', async (req,res)=>{

    const {product_class,rating,name,mrp,sort,select,page,limit} = req.query   
    const query_object = {}   

    if(product_class) query_object.product_class = product_class

    if(rating) query_object.rating = rating

    if(name){
        query_object.name = { $regex : name, $options : "i"}   
    }

    if(mrp) query_object.mrp = mrp
    
    let api_data = Product.find(query_object)
    
    if(sort){
        let sortfix = sort.replace(","," ")      
        api_data = api_data.sort(sortfix)
    }

    
    if(select){
        let selectfix = select.split(',').join(' ')     
        api_data = api_data.select(selectfix)
    }
    
    // Adding Pagination
    let page_no = Number(page)      
    let limit_per_page = Number(limit)
    let skip_logic = (page_no - 1) * limit_per_page
    api_data = api_data.skip(skip_logic).limit(limit_per_page)


    const filtered_data = await api_data
    res.status(200).json(filtered_data)
})

// Listening to Server
const server_start = async ()=>{
    try{
        await connect_product_DB()   // Function defined in connection.js called here
        app.listen(port, ()=>{
            console.log(`The Server is listening on port no. ${port}`)
        })
    }
    catch(err){
        console.log(`Server cannot listen due to error ${err}`)
    }
}
server_start()