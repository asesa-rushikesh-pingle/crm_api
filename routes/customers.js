var express = require('express');
var router = express.Router();
const models = require("../models");
const { Op, where } = require('sequelize');
const checkAuth = require("../middleware/auth")

/* Create stock. */
router.post('/create', checkAuth, function (req, res) {



    let customer = {
        name: req.body.name,
        address: req.body.address,
        mobile: req.body.mobile,
        email: req.body.email,
        pendingAmount: req.body.pendingAmount,
    }

    models.Customer.create(customer).then(response => {
        res.status(200).json({
            "status": true,
            "msg": "customer created successfully",
            "stock": customer
        })
    }).catch(err => {
        res.status(500).json({
            "status": false,
            "msg": "something went wrong",
            "errors": err
        })
    })


});


/* stock list. */
router.get('/', checkAuth, function (req, res) {

    const { page = 1, limit = 10, search = '' } = req.query

    let query = {}
    if (search) {
        query.name = { [Op.substring]: search }
    }



    models.Customer.findAndCountAll({
        where: query,
        limit: Number(limit),
        offset: (page - 1) * limit

    }).then(response => {
        res.status(200).json({
            "status": true,
            "msg": "customers found!!",
            "customers": response.rows,
            "pagination": {
                "curPage": Number(page),
                "totalPages": Math.ceil(response.count / Number(limit)),
                "total": response.count
            }
        })
    }).catch(err => {
        res.status(500).json({
            "status": false,
            "msg": "something went wrong",
            "errors": err
        })
    })

});


/* Create stock. */
router.post('/update', checkAuth, function (req, res) {

    const { id } = req.query

    let customer = {
        name: req.body.name,
        address: req.body.address,
        mobile: req.body.mobile,
        email: req.body.email,
        pendingAmount: req.body.pendingAmount,
    }

    models.Customer.update(customer, { where: { id: id } }).then(response => {
        res.status(200).json({
            "status": true,
            "msg": "customer updated successfully",
            "stock": customer
        })
    }).catch(err => {
        res.status(500).json({
            "status": false,
            "msg": "something went wrong",
            "errors": err
        })
    })


});

/* gte single  stock. */
router.get('/details', checkAuth, async function (req, res) {

    const { id } = req.query

    try {
        let customerObj = await models.Customer.findByPk(id)
        if (customerObj) {
            console.log("customerObj",customerObj)

            let ordersArr  = await models.Bill.findAll({
                where : {customerId : customerObj.id}
            })



            customerObj.dataValues.orders = ordersArr
            res.status(200).json({
                "status": false,
                "msg": "User found successfully",
                "customer": customerObj.dataValues
            })
        } else {
            res.status(500).json({
                "status": false,
                "msg": "user not found"
            })
        }



    } catch (error) {
        res.status(500).json({
            "status": false,
            "msg": "something went wrong",
            "errors": error
        })
    }



});


module.exports = router;
