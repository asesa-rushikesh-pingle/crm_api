var express = require('express');
var router = express.Router();
const multer  = require('multer')
const path =  require('path')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix =  Date.now() + '-' + file.originalname
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

/* GET home page. */
router.get('/', function(req, res, next) {
 res.send("hie")
});
/* Upload files */
router.post('/upload',upload.any(), function(req, res, next) {

    // let filee = req.file
    // console.log(filee)

    let pro = req.files
    console.log(pro)
    

    res.json({
        "msg":"image upload successfully",
        "file": "filee"
       
    })

});

module.exports = router;
