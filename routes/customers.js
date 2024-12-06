var express = require('express');
var router = express.Router();
const models = require("../models");
const { Op } = require('sequelize');

/* Create stock. */
router.post('/create', function(req, res) {

 

    let customer = {
        name: req.body.name,
        address: req.body.address,
        mobile: req.body.mobile,
        email: req.body.email,
        pendingAmount: req.body.pendingAmount,
    }

    models.Customer.create(customer).then(response=>{
        res.status(200).json({
            "status":true,
            "msg":"customer created successfully",
            "stock":customer
        })
    }).catch(err=>{
        res.status(500).json({
            "status":false,
            "msg":"something went wrong",
            "errors":err
        })
    })

  
});


/* stock list. */
router.get('/', function(req, res) {

    const {page = 1,limit = 10,search = ''} = req.query

    let query = {}
    if(search){
        query.name = {[Op.substring] : search}
    }

    

    models.Customer.findAndCountAll({
        where : query,
        limit : Number(limit),
        offset : (page - 1) * limit
       
    }).then(response=>{
        res.status(200).json({
            "status":true,
            "msg":"customers found!!",
            "customers":response.rows,
            "pagination":{
                "curPage": Number(page),
                "totalPages": Math.ceil(response.count / Number(limit)) , 
                "total" : response.count
            }
        })
    }).catch(err=>{
        res.status(500).json({
            "status":false,
            "msg":"something went wrong",
            "errors":err
        })
    })
  
});


/* Create stock. */
router.post('/update', function(req, res) {

    const {id} = req.query

    let stock = {
        itemName: req.body.itemName,
        itemType: req.body.itemType,
        itemGroup: req.body.itemGroup,
        itemWeight: req.body.itemWeight,
        stoneWeight: req.body.stoneWeight,
        finalWeight: req.body.finalWeight,
        stock: req.body.stock,
        sellBy: req.body.sellBy,
        uom: req.body.uom
    }

    models.Stock.update(stock,{where : {id : id}}).then(response=>{
        res.status(200).json({
            "status":true,
            "msg":"stock updated successfully",
            "stock":stock
        })
    }).catch(err=>{
        res.status(500).json({
            "status":false,
            "msg":"something went wrong",
            "errors":err
        })
    })

  
});

/* gte single  stock. */
router.get('/details', function(req, res) {

    const {id} = req.query

    

    models.Stock.findByPk(id).then(response=>{

        if(!response){
            res.status(500).json({
                "status":false,
                "msg":"Not found"
            })
        }else{
            res.status(200).json({
                "status":true,
                "msg":"stock updated successfully",
                "stock":response
            })
        }

       
    }).catch(err=>{
        res.status(500).json({
            "status":false,
            "msg":"something went wrong",
            "errors":err
        })
    })

  
});


module.exports = router;
