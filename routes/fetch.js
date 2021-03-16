// node.js code

//express is the framework we're going to use to handle requests
const express = require('express')

//retrieve the router project from express
var router = express.Router()

// sends "hello world if fetch("/fetch/demo") called
router.get("/demo", (request, response) => {
    response.send({ message:'hello world'})
})

router.get("/params", (request, response) => {
    if (request.query.name) {
        response.send({
            //req.query is a reference to arguments in the POST body
            message: `Hello, ${request.query.name}! You sent a GET Request`
        })
    } else {
        response.status(400)
        response.send({
            message: "Missing required information"
        })
    }
})


// looking for parameter of name
router.post("/params", (request, response) => {
    if (request.body.name) {
        response.send({
            //req.body is a reference to arguments in the POST body
            message: `Hello, ${request.body.name}! You sent a POST Request`
        })
    } else {
        response.status(400)
        response.send({
            message: "Missing required information"
        })
    }
})

router.get("/names", (request, response) => {
    let names = [
        { 'first':'Charles', 'last': 'Bryan'},
        { 'first':'Charlie', 'last': 'Brown'},
        { 'first':'Charles', 'last': 'Bronson'},
        { 'first':'Bryan', 'last': 'Charles'},
        { 'first':'Faulkner', 'last': 'Bryan'},
        { 'first':'Charles', 'last': 'Faulkner'}
    ]

    response.send({ 'count': 6, 'names':names})
})


// "return" the router
module.exports = router