const express = require('express')
const {User,Category} = require ('../model')
const Router = express.Router()


const auth = (req,res,next) => {
    const loggedIn = true

    if(loggedIn){
        next()
    } else {
        next('Not logged in')
    }
}

Router.get('/', async (req,res, next) => {
    const users = await User.find()
    const Categories = await Category.find()
    res.json({
        users,
        Categories
    })
})

Router.post('/about/:num',auth,(req,res,next) => {
    res.json({
        url : req.url,
        method: req.method,
        params: req.params,
        query: req.query,
    })
})


Router.use((req,res) => {
    res.status(40).json({
        error:'Not Found'
    })
})

module.exports = Router