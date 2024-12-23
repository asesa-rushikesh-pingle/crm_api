var express = require('express');
var router = express.Router();
const models = require("../models");
const { Op } = require('sequelize');
const checkauth = require('../middleware/auth');
const { default: puppeteer } = require('puppeteer');
const fs = require('fs')
const path = require('path');

/* Create bill. */
router.post('/create', checkauth, async function (req, res) {

    


    let bill = {
        "customerId": req.body.customerId,
        "subTotal": req.body.subTotal,
        "oldSubTotal": req.body.oldSubTotal,
        "discount": req.body.discount,
        "finalTotal": req.body.finalTotal,
        "amountPaid": req.body.amountPaid,
        "remainingAmount": req.body.remainingAmount
    }

    let itemms = req.body.items

    // Launch Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let htmll = `<!DOCTYPE html>
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
            width: 540px;
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
        <div class="bandDate">
            <div class="bilNo">
                <div class="tit">
                    Bill No:
                </div>
                <div class="val">
                    2347
                </div>
            </div>
            <div class="bilNo">
                <div class="tit">
                    Date:
                </div>
                <div class="val">
                    2023/12/03
                </div>
            </div>
        </div>
        <div class="bandDate">
            <div class="bilNo">
                <div class="tit">
                    Name:
                </div>
                <div class="val">
                    Customer Name here
                </div>
            </div>
           
        </div>
        <div class="bandDate">
            <div class="bilNo">
                <div class="tit">
                    Mobile:
                </div>
                <div class="val">
                    Customer mobile
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
                <tr>
                    <td>
                        Item Name Hhfsbdfhb sjfd sdfhbs dfsdhf bsd
                    </td>
                    <td>
                        Gold
                    </td>
                    <td>
                        2332
                    </td>
                    <td>
                        23
                    </td>
                    <td>
                        1
                    </td>
                    <td>
                        300
                    </td>
                    <th>
                        249
                    </th>
                </tr>
                <tr>
                    <td>
                        Item Name Hhfsbdfhb sjfd sdfhbs dfsdhf bsd
                    </td>
                    <td>
                        Gold
                    </td>
                    <td>
                        2332
                    </td>
                    <td>
                        23
                    </td>
                    <td>
                        1
                    </td>
                    <td>
                        300
                    </td>
                    <th>
                        249
                    </th>
                </tr>
                

            </tbody>
        </table>

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
                <tr>
                    <td>
                        Item Name Hhfsbdfhb sjfd sdfhbs dfsdhf bsd
                    </td>
                    <td>
                        Gold
                    </td>
                    <td>
                        2332
                    </td>
                    <td>
                        23
                    </td>
                    <td>
                        1
                    </td>
                  
                    <th>
                        249
                    </th>
                </tr>
             
                

            </tbody>
        </table>

 
            <table  border="1"  class="tabllee totalTable">
            
                <tbody>
                    <tr >
                       
                        <th>
                            Pending
                        </th>
                      
                        <th>
                            249
                        </th>
                    </tr>
                    <tr>
                       
                        <th>
                            Sub Total
                        </th>
                      
                        <th>
                            249
                        </th>
                    </tr>
                    <tr>
                       
                        <th>
                            Old Total
                        </th>
                      
                        <th>
                            249
                        </th>
                    </tr>
                    <tr>
                       
                        <th>
                            Discount
                        </th>
                      
                        <th>
                            249
                        </th>
                    </tr>
                    <tr class="bgTotall">
                       
                        <th>
                            Final Total
                        </th>
                      
                        <th>
                            249
                        </th>
                    </tr>
                    <tr>
                       
                        <th>
                            Amount Paid
                        </th>
                      
                        <th>
                            249
                        </th>
                    </tr>
                    <tr>
                       
                        <th>
                            Remaining
                        </th>
                      
                        <th>
                            249
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

    // Set the HTML content
    await page.setContent(htmll, { waitUntil: 'load' });

    // Define the file path to save the PDF
    const filePath = path.join( 'pdfs', `${Date.now() + "invoice"}.pdf`);

    // Ensure the directory exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Generate PDF
   await page.pdf({
        path: filePath, // Save PDF to this path
        format: 'A5',   // PDF format
        printBackground: true, // Include background in the PDF
    });

    await browser.close();

    let newPath = filePath.replace('pdfs\\','/')

    res.status(200).json({ message: 'PDF generated successfully!', newPath });
    return




    models.Bill.create(bill).then(response => {


        itemms.forEach(element => {

            models.BillNewItem.create({
                billId: response.id,
                itemName: element.itemName,
                itemType: element.itemType,
                itemGroup: element.itemGroup,
                rate: element.rate,
                weight: element.weight,
                qty: element.qty,
                makingAmount: element.makingAmount,
                total: element.total
            }).then(respo => {

            }).catch(err => {
                console.log(err)
                res.status(500).json({
                    "status": false,
                    "msg": "something went wrong",
                    "errors": err
                })
                return
            })

        });





        res.status(200).json({
            "status": true,
            "msg": "bill created successfully",
            "bill": response
        })


    }).catch(err => {
        res.status(500).json({
            "status": false,
            "msg": "something went wrong",
            "errors": err
        })
        console.log(err)
    })


});


/* stock list. */
router.get('/', checkauth, function (req, res) {

    const { page = 1, limit = 10, search = '' } = req.query

    let query = {}
    if (search) {
        query.itemName = { [Op.substring]: search }
    }


    models.Stock.findAndCountAll({
        where: query,
        limit: Number(limit),
        offset: (page - 1) * limit

    }).then(response => {
        res.status(200).json({
            "status": true,
            "msg": "stock found!!",
            "stock": response.rows,
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
