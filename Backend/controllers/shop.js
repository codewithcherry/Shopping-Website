const Product=require("../models/product");
const User=require("../models/user");

exports.getHome=(req,res,next)=>{
    const page=req.query.page;
    const limit=8;
    Product.countDocuments().then(totaldoc=>{
       const pagination={
        total:totaldoc,
        totalPages:Math.ceil(totaldoc/limit),
        currentpage:page,
        nextPage:page<(Math.ceil(totaldoc/limit))?true:false,
        prevPage:page>1?true:false
       }
       return    Product.find()
                        .skip((page-1)*limit)
                        .limit(limit)
                        .then(products=>{
                            res.status(200).json({
                                success: true,
                                products: products,
                                pagination:pagination
                                });
                        })
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.getCart=(req,res,next)=>{
    const user=req.user;

    User.findById(user.userId)
    .then(user=>{
        res.json(user)
    })
    .catch(err=>{
        res.status(404).json("cart not found")
    })

    
}