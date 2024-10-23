const Product=require("../models/product");

exports.getHome=(req,res,next)=>{
    Product.find()
    .then(products=>{
        res.status(200).json({
            success: true,
            products: products
          });
    })
    .catch(err=>{
        console.log(error);
    })
}