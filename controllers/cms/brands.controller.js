const {showError, validationError} = require("../../lib")
const { Brand } = require("../../models")

class brandsController {
    index = async(req,res,next) => {
        try {
            const brands = await Brand.find()
            res.json(brands)
        } catch (err) {
            showError(err, next)
        }
    }
    
    store = async(req,res,next) => {
        try {
            const {name, status} = req.body
                await Brand.create({name, status})
                res.status(201).json({
                    success: 'Brand created.'       
                })
        } 
        catch (err) {
          validationError(err,next)
        }
    }

    show = async (req,res,next) => {
        try {
            const brands = await Brand.findById(req.params.id)

            if(brands) {
                res.json(brands)
            }
            else{
                next({
                    message: 'Brand not found',
                    status: 404
                })
            }
            
        } catch (err) {
            showError(err, next)
        }
    }

    update = async (req,res,next) => {
        try {
            const {name, status} = req.body

            const brands = await Brand.findByIdAndUpdate(req.params.id, {name, status })

            if(brands) {
                res.json({
                    success: 'Brand updated.'
                })       
            }
            else{
                next({
                    message: 'Brand not found',
                    status: 404
                })
            }     
        } catch (err) {
            validationError(err,next)
        }
    }

    destroy = async (req,res,next) => {
        try {
            
            const brands = await Brand.findByIdAndDelete(req.params.id)
            if(brands){
                res.json({
                    success: 'Brand removed.'
                })            
            }
            else{
                next({
                    message: 'Brand not found',
                    status: 404
                })
            } 
        } catch (err) {
            showError(err, next)
        }
    }
}


module.exports = new brandsController