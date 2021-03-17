//express is the framework we're going to use to handle requests
const express = require('express')

const router = express.Router()
 
const pool = require('../utilities/exports').pool

const isProvided = require('../utilities/exports').helpers.isProvided
/**
 * @apiDefine JSONError
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 */ 

/**
 * @api {get} /cookie_orders Request to get all Order entries in the DB
 * @apiName GetOrders
 * @apiGroup Orders w/Cookies
 *
 * @apiDescription Returns all of the order entries in the DB for the user associated with the 
 * JWT found in the HTTP Request Cookie.
 * 
 * 
 * @apiSuccess {Object[]} orders List of Orders in the database
 * 
 * @apiError (404: No Orders Found) {String} message "No Orders"
 * @apiError (403: JSON Error) {String} message "Token is not valid" when a JWT is provided but it is expired or otherwise not valid
 * @apiError (401: JSON Error) {String} message "Auth token is not supplied" when a JWT is not provided or the cookie is expired
 * 
 * @apiUse JSONError
 */ 
router.get("/", (request, response) => {

    const memberid = request.body.memberid

    const theQuery = 
        `SELECT *
         FROM PizzaOrders
         WHERE MemberID=$1`
    let values = [memberid]

    // const theQuery = 
    //     `SELECT * 
    //      FROM Orders`

    pool.query(theQuery, values)
        .then(result => {
            if (result.rowCount > 0) {
                response.send({
                    orders: result.rows
                })
            } else {
                response.status(404).send({
                    message: "No Orders"
                })
            }
        })
        .catch(err => {
            //log the error
            // console.log(err.details)
            response.status(400).send({
                message: err.detail
            })
        })
})



/**
 * @apiDefine JSONError
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters!!!!"
 */ 

/**
 * @api {post} /orders Request to add Order entry in the DB
 * @apiName AddOrders
 * @apiGroup Orders
 *
 * @apiHeader {String} authorization Valid JSON Web Token JWT 
 * 
 * @apiParamExample {json} Request-Query-Example:
 *     https://uwnetid-tcss460-w21.herokuapp.com/orders
 * 
 * @apiSuccess {Object[]} orders List of Orders in the database
 * 
 * @apiError (404: No Orders Found) {String} message "No Orders"
 * @apiError (400: Invalid Parameters) {String} message "Invalid Input Parameters!"
 * @apiError (400: Missing Parameters) {String} message "Missing Input Parameters!"
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters!"
 * @apiError (403: JSON Error) {String} message "Token is not valid" when a JWT is provided but it is expired or otherwise not valid
 * @apiError (401: JSON Error) {String} message "Auth token is not supplied" when a JWT is not provided or it is provided in an incorrect format
 * 
 * @apiUse JSONError
 */ 
router.post("/", (request, response, next) => {
    console.log("post pizza_orders!!!!");
    const memberid = request.body.memberid
    const order = request.body.order

    console.log("member id:")
    console.log(memberid)
    console.log("order: ")
    console.log(order);

    console.log("isProvided(memberid)")
    console.log(isProvided(memberid))

    console.log("isProvided(memberid)")
    console.log(memberid !== undefined)
    console.log("isProvided(order)")
    console.log(isProvided(order))
    //Verify that the caller supplied all the parameters
    //In js, empty strings or null values evaluate to false
    if(memberid !== undefined && isProvided(order)) {
        if (typeof memberid === 'number') {
            next()
        } else {
            response.status(400).send({
                message: "Invalid Input Parameters!"
            })
        }
    } else {
        response.status(400).send({
            message: "Missing Input Parameters!"
        })
    }
}, (request, response) => {
    console.log("last node");
    const memberid = request.body.memberid
    const order = request.body.order
    console.log("typeof(memberID): " + typeof(memberID));

    console.log("request.body.memberid: " + request.body.memberid);

    //const theQuery = 'INSERT INTO Orders(MemberID, My_Size, My_Color, Option1, Option2, Option3) VALUES ($1, $2, $3, $4, $5, $6) RETURNING*';
    const theQuery = 'INSERT INTO PizzaOrders(MemberID, OrderDetails) VALUES ($1, $2)      RETURNING*';
    const values = [memberid, order]
    /*console.log("before query:");
    pool.query(theQuery, values)
    .then(result => { 
        console.log("result");
    })
    .catch((err) => {
        console.log("ERROR!");
        //log the error
        console.log(err.stack)
        response.status(400).send({
            message: err.detail
        })
    })*/
    console.log("before query:");
    pool.query(theQuery, values)
        .then(result => { 
            console.log("result");
            if (result.rowCount == 0) {
                response.status(404).send({
                    message: 'User not found' 
                })
                return
            } else {
                response.status(201).send({
                    success: true,
                    result: result.fields
                })
            }
        })
        .catch((err) => {
            console.log("ERROR!");
            //log the error
            console.log(err.stack)
            response.status(400).send({
                message: err.detail
            })
        })
})


/**
 * @apiDefine JSONError
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 */ 

/**
 * @api {get} /cookie_orders Request to get all Order entries in the DB
 * @apiName GetOrders
 * @apiGroup Orders w/Cookies
 *
 * @apiDescription Returns all of the order entries in the DB for the user associated with the 
 * JWT found in the HTTP Request Cookie.
 * 
 * 
 * @apiSuccess {Object[]} orders List of Orders in the database
 * 
 * @apiError (404: No Orders Found) {String} message "No Orders"
 * @apiError (403: JSON Error) {String} message "Token is not valid" when a JWT is provided but it is expired or otherwise not valid
 * @apiError (401: JSON Error) {String} message "Auth token is not supplied" when a JWT is not provided or the cookie is expired
 * 
 * @apiUse JSONError
 */ 
 router.delete('/', (request ,response) =>{
    
    console.log("delete!!");
    const memberid = request.body.memberid

    console.log("memberid is: " + memberid);

    const theQuery = 
        `DELETE
         FROM PizzaOrders
         WHERE MemberID=$1`
    let values = [memberid]

    // const theQuery = 
    //     `SELECT * 
    //      FROM Orders`

    pool.query(theQuery, values)
        .then(result => {
            if (result.rowCount > 0) {
                console.log("if");
                response.send({
                    orders: result.rows
                })
            } else {
                console.log("else")
                response.status(404).send({
                    message: "No Orders to Delete"
                })
            }
        })
        .catch(err => {
            console.log("error")
            //log the error
            // console.log(err.details)
            response.status(400).send({
                message: err.detail
            })
        })
})


module.exports = router