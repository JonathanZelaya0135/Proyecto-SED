const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

/*routes
app.get('/', (req, res) => {
    res.send('hello')
})

app.get('/blog', (req, res) => {
    res.send('hello blog xd')
})*/

//Add products
app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//Get all products
app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        //console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//Get product by ID
app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        //console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//Update product by ID
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        
        //The product with the ID provided is not in the databse
        if(!product) {
            return res.status(404).json({message: `cannot find product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id, req.body);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error,message})
    }
})

//Delete product by ID
app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
        if(!product) {
            return res.status(404).json({message: `cannot find product with ID ${id}`})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Database connection
mongoose.connect('mongodb+srv://admin:00403821@projectapi.nfdc53m.mongodb.net/ProjectAPI?retryWrites=true&w=majority').then(() => {
app.listen(3000, () => {
    console.log('connected to MongoDB')
    console.log(`Node API app is running on port 3000`)
})  
}).catch(() => {
    console.log(error)
})