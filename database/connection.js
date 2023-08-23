const mongoose = require('mongoose')

// Connection function defined but will be called from app.js file
function connect_product_DB(){
    return mongoose.connect('mongodb+srv://priteshsrv:Prikha1303@priteshapi.kwiwdof.mongodb.net/PriteshAPI?retryWrites=true&w=majority',
        {useNewUrlParser:true, useUnifiedTopology:true
    })
}

module.exports = connect_product_DB