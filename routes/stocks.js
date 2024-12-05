var express = require('express');
var router = express.Router();
const models = require("../models")

/* GET home page. */
router.post('/create', function(req, res) {


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

    models.Stock.create(stock).then(response=>{
        res.status(200).json({
            "status":true,
            "msg":"stock created successfully",
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


/* stock list. */
router.get('/', function(req, res) {

    models.Stock.findAll().then(response=>{
        res.status(200).json({
            "status":true,
            "msg":"stock found!!",
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


module.exports = router;
