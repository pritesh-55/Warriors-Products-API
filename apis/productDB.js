const connect_product_DB = require("../database/connection")

const Product_DB = require("../database/models")

const Product_API = require("./product_api.json")  // No need to write export in json file, we can directly require

async function start(){
    try{
        await connect_product_DB()

        await Product_DB.deleteMany()  // Kch new insertion se pehle sara data delete kr do databse jisse new entry je time duplicates data n ho
        
        await Product_DB.create(Product_API)  //  Product_API ka sara json data Product_DB ke databse mein create ho jayega
    }
    catch(err){
        console.log('Cannot create store data of API due to'+err);
    }
}

start()