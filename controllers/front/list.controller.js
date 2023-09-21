const { showError } = require("../../lib")
const { Category, Brand } = require('../../models')

class ListController {
    categories = async(req, res, next) => {
        try {
            const categories = await Category.find({
                status: true
            }).exec()

            res.json(categories)
            
        } catch (err) {
            showError(err,next)
            
        }
    }

    categoriesById = async(req, res, next) => {
        try {
            const category = await Category.findById({_id: req.params.id, status: true}).exec()

            if(category){
                res.json(category)
            }
            else{
                next({
                    Message: "Category not found",
                    status: 404
                })
            }  
        } catch (err) {
            showError(err,next)
            
        }
    }
    
    brands = async(req, res, next) => {
        try {
            const brands = await Brand.find({
                status: true
            }).exec()

            res.json(brands)
            
        } catch (err) {
            showError(err,next)
            
        }
    }

    brandById = async(req, res, next) => {
        try {
            const brands = await Brand.findById({_id: req.params.id, status: true}).exec()

            if(brands){
                res.json(brands)
            }
            else{
                next({
                    Message: "Brand not found",
                    status: 404
                })
            }  
        } catch (err) {
            showError(err,next)
            
        }
    }


}

module.exports = new ListController