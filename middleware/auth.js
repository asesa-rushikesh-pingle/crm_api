<<<<<<< HEAD
const jwt = require("jsonwebtoken");

function checkauth(req, res, next) {
    try {

        let tokenn = req.headers.authorization.split(" ")[1]

        var decoded = jwt.verify(tokenn, 'rushi');
        console.log("decoded", decoded)

        if (decoded) {
            next()
        } else {
            res.status(500).json({
                "status": false,
                "msg": "Something went wrong in middleware"
            })
        }

    } catch (error) {
        res.status(401).json({
            "status": false,
            "msg": "invalid token ,please login again"
        })
        console.log(error)
    }

}

=======
const jwt = require("jsonwebtoken");

function checkauth(req, res, next) {
    try {


        let tokenn = req.headers.authorization.split(" ")[1]

        var decoded = jwt.verify(tokenn, 'rushi');
        console.log("decoded", decoded)

        if (decoded) {
            next()
        } else {
            res.status(500).json({
                "status": false,
                "msg": "Something went wrong in middleware"
            })
        }

    } catch (error) {
        res.status(401).json({
            "status": false,
            "msg": "invalid token ,please login again"
        })
        console.log(error)
    }

}

>>>>>>> refs/remotes/origin/main
module.exports = checkauth