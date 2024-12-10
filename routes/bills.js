var express = require('express');
var router = express.Router();
const models = require("../models");
const { Op } = require('sequelize');
const checkauth = require('../middleware/auth');

/* Create bill. */
router.post('/create',checkauth, function(req, res) {


    let bill = {
        "customerId": req.body.customerId,
    "subTotal": req.body.subTotal,
    "oldSubTotal": req.body.oldSubTotal,
    "discount": req.body.discount,
    "finalTotal": req.body.finalTotal,
    "amountPaid": req.body.amountPaid,
    "remainingAmount": req.body.remainingAmount
    }

    models.Bill.create(bill).then(response=>{
        res.status(200).json({
            "status":true,
            "msg":"bill created successfully",
            "stock":response
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
router.get('/',checkauth, function(req, res) {

    const {page = 1,limit = 10,search = ''} = req.query

    let query = {}
    if(search){
        query.itemName = {[Op.substring] : search}
    }


    models.Stock.findAndCountAll({
        where : query,
        limit : Number(limit),
        offset : (page - 1) * limit
       
    }).then(response=>{
        res.status(200).json({
            "status":true,
            "msg":"stock found!!",
            "stock":response.rows,
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
router.post('/update',checkauth, function(req, res) {

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
router.get('/details',checkauth, async function(req, res) {

    const {id} = req.query


    const [results, metadata] = await models.sequelize.query(`SELECT *  FROM Bills  INNER JOIN Customers ON Customers.id = Bills.customerId WHERE Bills.id = ${id}`);

    res.json({
        "status": true,
        "msg": "details found",
        "data" : results
    })
    

    // models.Bill.findByPk(id).then(response=>{



    //     if(!response){
    //         res.status(500).json({
    //             "status":false,
    //             "msg":"Not found"
    //         })
    //     }else{
    //         res.status(200).json({
    //             "status":true,
    //             "msg":"bill found successfully",
    //             "stock":response
    //         })
    //     }

       
    // }).catch(err=>{
    //     res.status(500).json({
    //         "status":false,
    //         "msg":"something went wrong",
    //         "errors":err
    //     })
    // })

  
});


module.exports = router;
