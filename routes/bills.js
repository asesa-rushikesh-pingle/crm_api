var express = require('express');
var router = express.Router();
const models = require("../models");
const { Op } = require('sequelize');
const checkauth = require('../middleware/auth');
var pdf = require("pdf-creator-node");
const fs = require('fs')
const path = require('path');

/* Create bill. */
router.post('/create', checkauth, async function (req, res) {

    try {

        let bill = {
            "pending": req.body.pending,
            "authId": req.authId,
            "customerId": req.body.customerId,
            "subTotal": req.body.subTotal,
            "oldSubTotal": req.body.oldSubTotal,
            "discount": req.body.discount,
            "finalTotal": req.body.finalTotal,
            "amountPaid": req.body.amountPaid,
            "remainingAmount": req.body.remainingAmount
        }

        let itemms = req.body.items
        let olditemms = req.body.olditems

        let custoDetails = {
            "name" : req.body.customerName,
            "mobile" : req.body.customerMobile,
            "date" : req.body.date
        }


        let htmlll = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice</title>
        <style>
            *{
                box-sizing: border-box;
                font-family: sans-serif;
            }
            .invoice {
    
                border: 3px double rgb(124, 124, 124);
                width: 580px;
                height: 750px;
                padding: 10px;
            }
            .mainHead{
                margin-top: 10px;
                text-align: center;
                font-size: 32px;
                font-weight: 600;
                color: rgb(255, 115, 0);
            }
            .nameeandMob{
                text-align: center;
                margin-top: 5px;
                font-size: 15px;
                font-weight: 600;
                color: rgb(0, 0, 0);
            }
            .bbt{
                border-bottom: 1px solid rgb(124, 124, 124);
                padding-bottom: 15px;
            }
            .address{
                text-align: center;
               padding-top: 5px;
               padding-bottom: 5px;
                font-size: 14px;
                font-weight: 500;
                color: rgb(0, 0, 0);
                border-bottom: 1px solid rgb(124, 124, 124);
            }
            .bandDate{
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 5px;
            }
            .bilNo{
                display: flex;
                align-items: center;
                column-gap: 10px;
            }
            .tit{
                font-weight: 600;
                font-size: 14px;
                color: black;
            }
            .val{
                font-weight: 500;
                font-size: 14px;
                color: black;
            }
            .tabllee{
                border-collapse: collapse;
                margin-top: 15px;
                width: 100%;
                /* background: rgb(243, 243, 243); */
                background: rgb(255, 240, 227);
            }
            .tabllee thead tr th{
                padding: 5px 2px;
            }
            .tabllee tbody tr td,.tabllee tbody tr th{
                padding: 3px 2px;
            }
          
            .tabllee tbody{
                /* background: rgb(243, 243, 243); */
            }
            .tabllee tr{
                text-align: left;
                font-size: 12px;
                
            }
            .totalTable{
                width: 150px;
                /* float: right; */
                border-collapse: collapse;
                background: rgb(255, 240, 227);
                margin-left: auto;
            }
            .totalTable th{
                padding: 2px 5px;
    
    
            }
            .bgTotall{
                background: rgb(255, 143, 46);
            }
    
            .thanks{
                text-align: center;
                font-size: 18px;
                font-style: italic;
                font-weight: 600;
                color: black;
                margin-top: 30px;
    
            }
            
        </style>
    </head>
    
    <body>
    
        <div class="invoice">
            <div class="bbt">
                <div class="mainHead">
                    Shree Arihant Jewellers
                </div>
                <div class="nameeandMob">
                   Sagar Babaso Kandgave, MOB : 8805477394
                </div>
            </div>
            <div class="address">
                Koshti Galli, Near Society Shop, Bhingare Building, Kagal
            </div>
            <div class="bandDate" style="height : 40px;">
            <table style="float:left;">
            <tbody>
                <tr>
                    <td>
                     <div class="bilNo">
                    <div class="tit">
                        Bill No:
                    </div>
                   
                </div>
                    </td>
                      <td>
                     <div class="bilNo">
                
                    <div class="val">
                        2347
                    </div>
                </div>
                    </td>
                </tr>
            </tbody>
            </table>
             <table style="float:right;" >
            <tbody>
                <tr>
                    <td>
                     <div class="bilNo">
                    <div class="tit">
                        Date:
                    </div>
                   
                </div>
                    </td>
                      <td>
                     <div class="bilNo">
                
                    <div class="val">
                         {{custoDetails.date}}
                    </div>
                </div>
                    </td>
                </tr>
            </tbody>
            </table>
               
            </div>
            <div class="bandDate">
                <div class="bilNo">
                    <div class="tit">
                        Name:
                    </div>
                    <div class="val">
    {{custoDetails.name}}
                    </div>
                </div>
               
            </div>
            <div class="bandDate">
                <div class="bilNo">
                    <div class="tit">
                        Mobile:
                    </div>
                    <div class="val">
                        {{custoDetails.mobile}}
                    </div>
                </div>
               
            </div>
    
            <table  border="1" class="tabllee">
                <thead >
                    <tr>
                        <th>
                            Item Name
                        </th>
                        <th>
                             Type
                        </th>
                        <th>
                            Rate
                        </th>
                        <th>
                            Weight
                        </th>
                        <th>
                            Qty
                        </th>
                        <th>
                            Making
                        </th>
                        <th>
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody>
              
                     {{#each itemms}}
                    <tr>
                        <td>
                        {{this.itemName}}
                        </td>
                        <td>
                              {{this.itemType}}
                        </td>
                        <td>
                            {{this.rate}}
                        </td>
                        <td>
                           {{this.weight}}
                        </td>
                        <td>
                             {{this.qty}}
                        </td>
                        <td>
                           {{this.makingAmount}}
                        </td>
                        <th>
                            {{this.total}}
                        </th>
                    </tr>
                     {{/each}}
                    
    
                </tbody>
            </table>
    
            
            {{#ifCond olditemms.length '>' '0'}}

              <table  border="1" class="tabllee">
                <thead >
                    <tr>
                        <th>
                            Old Item Name
                        </th>
                        <th>
                             Type
                        </th>
                        <th>
                            Rate
                        </th>
                        <th>
                            Weight
                        </th>
                        <th>
                            Qty
                        </th>
                      
                        <th>
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody>
                
                 {{#each olditemms}}
                    <tr>
                        <td>
                        {{this.itemName}}
                        </td>
                        <td>
                              {{this.itemType}}
                        </td>
                        <td>
                            {{this.rate}}
                        </td>
                        <td>
                           {{this.weight}}
                        </td>
                        <td>
                             {{this.qty}}
                        </td>
                        <th>
                            {{this.total}}
                        </th>
                    </tr>
                     {{/each}}
                 
                </tbody>
            </table>

             {{/ifCond}}

          
    
     
                <table  border="1"  class="tabllee totalTable">
                
                    <tbody>
                        <tr >
                           
                            <th>
                                Pending
                            </th>
                          
                            <th>
                                  {{bill.pending}}
                            </th>
                        </tr>
                        <tr>
                           
                            <th>
                                Sub Total
                            </th>
                          
                            <th>
                                {{bill.subTotal}}
                            </th>
                        </tr>
                        <tr>
                           
                            <th>
                                Old Total
                            </th>
                          
                            <th>
                                {{bill.oldSubTotal}}
                            </th>
                        </tr>
                        <tr>
                           
                            <th>
                                Discount
                            </th>
                          
                            <th>
                               {{bill.discount}}
                            </th>
                        </tr>
                        <tr class="bgTotall">
                           
                            <th>
                                Final Total
                            </th>
                          
                            <th>
    {{bill.finalTotal}}
                            </th>
                        </tr>
                        <tr>
                           
                            <th>
                                Amount Paid
                            </th>
                          
                            <th>
                                 {{bill.amountPaid}}
                            </th>
                        </tr>
                        <tr>
                           
                            <th>
                                Remaining
                            </th>
                          
                            <th>
                                {{bill.remainingAmount}}
                            </th>
                        </tr>
                     
                        
        
                    </tbody>
                </table>
         
    
            
    
            <div class="thanks">
                Thank You...
            </div>
                
        </div>
    
    </body>
    
    </html>`

        var options = {
            format: "A4",
            orientation: "portrait",
            border: "0mm"
        };

        const fileName = Date.now() + ".pdf"

        var document = {
            html: htmlll,
            data: {
                itemms: itemms,
                olditemms: olditemms,
                bill: bill,
                custoDetails : custoDetails
            },
            path: `./pdfs/${fileName}`,
            type: "",
        };

        const pdfResponse = await pdf.create(document, options)

        if (pdfResponse) {

            const billRespo = await models.Bill.create({
                fileName : fileName,
                authId: bill.authId,
                customerId: bill.customerId,
                subTotal: bill.subTotal,
                oldSubTotal: bill.oldSubTotal,
                discount: bill.discount,
                finalTotal: bill.finalTotal,
                amountPaid: bill.amountPaid,
                remainingAmount: bill.remainingAmount
            })

            if (billRespo) {
                console.log(billRespo.dataValues)
                if (itemms.length > 0) {
                    await itemms.forEach(async element => {
                        let billNewItemRespo = await models.BillNewItem.create({
                            billId: billRespo.dataValues.id,
                            itemName: element.itemName,
                            itemType: element.itemType,
                            itemGroup: element.itemGroup,
                            rate: element.rate,
                            weight: element.weight,
                            qty: element.qty,
                            makingAmount: element.makingAmount,
                            total: element.total
                        })
                    });

                    // stock update start 


                    await itemms.forEach(async element => {
                        let fetchedStock = await models.Stock.findByPk(element.id)
                        let stockRespo =  await models.Stock.update({...fetchedStock,stock : Number(fetchedStock.stock) - Number(element.qty)},{where : {id : element.id}})
                    });

                    // stock update end

                    // customer pending amount update start 
                     let custoRespo  =  await models.Customer.update({"pendingAmount" : bill.remainingAmount}, { where: { id: bill.customerId } })
                     if(custoRespo){
                         console.log("customer updated !!!")
                     }

                    // customer pending amount update end





                    if (olditemms.length > 0) {
                        await olditemms.forEach(async element => {
                            let billOldItemRespo = await models.BillOldItem.create({
                                billId: billRespo.dataValues.id,
                                itemName: element.itemName,
                                itemType: element.itemType,
                                itemGroup: element.itemGroup,
                                rate: element.rate,
                                weight: element.weight,
                                qty: element.qty,
                                total: element.total
                            })
                        });

                        res.status(200).json({
                            "status": true,
                            "msg": "bill generated successfully with old items",
                            "invoice": fileName
                        })


                    } else {



                        res.status(200).json({
                            "status": true,
                            "msg": "bill generated successfully",
                            "invoice": fileName
                        })
                    }





                } else {
                    throw "please add atleast one item"
                }

            } else {
                throw "bill not created successfully";
            }




        } else {
            res.json({ "msg": "error in else block" })
        }




    } catch (error) {
        console.log(error)
        res.status(500).json({
            "status": false,
            "msg": "something went wrong",
            "errors": error
        })

    }









});


/* stock list. */
router.get('/', checkauth, async function (req, res) {

    const { page = 1, limit = 10, search = '' } = req.query

    let query = {}
    if (search) {
        query.itemName = { [Op.substring]: search }
    }


    try {

        const [billList, metadata] = await models.sequelize.query(`SELECT Bills.id as bill_id, Bills.authId, Bills.fileName, Customers.id as customer_id, Customers.name as customer_name, Bills.subTotal, Bills.oldSubTotal,Bills.discount,Bills.finalTotal,Bills.amountPaid,Bills.remainingAmount,Bills.createdAt FROM Bills INNER JOIN Customers ON Bills.CustomerId = Customers.id WHERE Bills.authId = ${req.authId} AND Customers.name LIKE '%${search}%' ORDER BY  Bills.id DESC LIMIT ${limit} OFFSET ${(Number(page) - 1) * limit}`);

        res.status(200).json({
            "status": true,
            "message": "bills found successfully",
            "bills": billList
        })

    } catch (error) {
        res.status(500).json({
            "status": false,
            "msg": "something went wrong",
            "errors": error
        })

    }



});


/* Create stock. */
router.post('/update', checkauth, function (req, res) {

    const { id } = req.query

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

    models.Stock.update(stock, { where: { id: id } }).then(response => {
        res.status(200).json({
            "status": true,
            "msg": "stock updated successfully",
            "stock": stock
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
router.get('/details', checkauth, async function (req, res) {

    const { id } = req.query


    const [results, metadata] = await models.sequelize.query(`SELECT Bills.id as bill_id,Bills.*,Customers.*,Customers.id as customer_id  FROM Bills  INNER JOIN Customers ON Customers.id = Bills.customerId WHERE Bills.id = ${id}`);

    const [itesmm, itemssmetadata] = await models.sequelize.query(`SELECT * FROM BillNewItems  WHERE BillNewItems.billId = ${id}`);

    res.json({
        "status": true,
        "msg": "details found",
        "data": results,
        "items": itesmm
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
