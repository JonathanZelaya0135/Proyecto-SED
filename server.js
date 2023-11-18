const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Product = require('./models/productModel')
const User = require('./models/userModel')
const { authUser, setUser, authRole } = require('./auth')
const app = express()
const jsonParser = bodyParser.json()

//app.use(setUser)
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes
app.get('/', (req, res) => {
    res.send('<h1>Proyecto de seguridad en entornos de desarrollo - Home</h1>')
})

//User routes----------------------------------------------------------------
//Add user
app.post('/users', async(req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//Get all users
app.get('/users',setUser, authUser, authRole('admin'), async(req, res) => {
    try {
        //setUser(req.body.userId)
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//Get user by ID
app.get('/users/:id', setUser, authUser, authRole('admin'), async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);

        //The user with the ID provided is not found in the databse
        if(!user) {
            return res.status(404).json({message: `cannot find user with ID ${id}`})
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//Update user by ID
app.put('/users/:id', setUser, authUser, authRole('admin'), async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        console.log(req.body)
        
        //The user with the ID provided is not found in the databse
        if(!user) {
            return res.status(404).json({message: `cannot find user with ID ${id}`})
        }
        const updatedUser = await User.findById(id, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

//Delete user by ID
app.delete('/users/:id', setUser, authUser, authRole('admin'), async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id)

        //The user with the ID provided is not found in the databse
        if(!user) {
            return res.status(404).json({message: `cannot find user with ID ${id}`})
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

//Product routes-------------------------------------------------------------
//Add product
app.post('/products', setUser, authUser, authRole('admin'), async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//Get all products
app.get('/products', setUser, authUser, async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//Get product by ID
app.get('/products/:id', setUser, authUser, async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//Update product by ID
app.put('/products/:id', setUser, authUser, authRole('admin'), async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        
        //The product with the ID provided is not found in the databse
        if(!product) {
            return res.status(404).json({message: `cannot find product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id, req.body);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

//Delete product by ID
app.delete('/products/:id', setUser, authUser, authRole('admin'), async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id)

        //The product with the ID provided is not found in the databse
        if(!product) {
            return res.status(404).json({message: `cannot find product with ID ${id}`})
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

//Setting user
/*function setUser(id) {
    if(id) {
        req.user = User.find(user => user.id === userId)
    }
}*/

/*function setUser(req, res, next) {
    console.log("aber?")
    console.log(req.body)
    const userId = req.body.userId
    console.log("se llega?")
    if (userId) {
        req.user = User.find(user => user.id === userId)
    }
    next()
}*/

//Database connection--------------------------------------------------------
mongoose.connect('mongodb+srv://admin:00403821@projectapi.nfdc53m.mongodb.net/ProjectAPI?retryWrites=true&w=majority').then(() => {
app.listen(3000, () => {
    console.log('connected to MongoDB')
    console.log(`Node API app is running on port 3000`)
})  
}).catch(() => {
    console.log(error)
})