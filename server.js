import express from 'express';
import product from './data/fs/products.fs.js';
import user from './data/fs/users.fs.js'

const server = express();

server.use(express.urlencoded({extended:true}));

/* Endpoints de productos */

server.get('/api/products', async (req,res) =>{
    
    const arrayProducts = await product.read()
    
    if (arrayProducts.length > 0) {

        res.status(200).json({success: true, response: arrayProducts})
    } else {
        res.status(404).json({success: false, message: 'Not found'})
    }

})

server.get('/api/products/:pid', async (req, res)=>{

    const id = parseInt(req.params.pid);
    const obj = await product.readOne(id)

    if (obj !== null) {
        res.status(200).json({success: true, response: obj})  
    } else {
        res.status(404).json({success: false, message: 'Not found'})
    }

})

/* Endpoints de usuarios */

server.get('/api/users', async (req, res)=>{
    const usersArray = await user.read()

    if (usersArray.length > 0) {
        res.status(200).json({success: true, response: usersArray})
    } else {
        res.status(404).json({success: false, message: 'Not found'})
    }
})
server.get('/api/users/:uid', async (req, res)=>{
    
    const id = parseInt(req.params.uid);
    const obj = await user.readOne(id)

    if (obj !== null) {
        res.status(200).json({success: true, response: obj})  
    } else {
        res.status(404).json({success: false, message: 'Not found'})
    }

})



const PORT = 8000
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})