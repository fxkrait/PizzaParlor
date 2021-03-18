//express is the framework we're going to use to handle requests
const express = require('express')

const router = express.Router()
 
const pool = require('../utilities/exports').pool

const isProvided = require('../utilities/exports').helpers.isProvided

/**
 * @api {get} /pizza_orders Request to get all Order entries in the DB
 * @apiName GetOrders
 * @apiGroup PizzaOrders
 * 
 * @apiHeader {String} authorization Valid JSON Web Token JWT 
 *
 * @apiDescription Returns all of the order entries in the DB for the user associated with the 
 * JWT found in the HTTP Request Cookie.
 * 
 * 
 * @apiSuccess {Object[]} orders List of Orders in the database
 * 
 * @apiError (400: SQL Error) {String} message "err.detail"
 * @apiError (404: No Orders Found) {String} message "No Orders"
 * @apiError (403: JSON Error) {String} message "Token is not valid" when a JWT is provided but it is expired or otherwise not valid
 * @apiError (401: JSON Error) {String} message "Auth token is not supplied" when a JWT is not provided or the cookie is expired
 * 
 * @apiUse JSONError
 */ 
router.get("/", (request, response) => {

    //const memberid = request.body.memberid
    const memberid = request.decoded.memberid
    console.log("memberid is: " + memberid);
    
    console.log("request.decoded is: ")
    console.log(request.decoded);

    const theQuery = 
        `SELECT *
         FROM PizzaOrders
         WHERE MemberID=$1`
    let values = [memberid]

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
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 */ 

/**
 * @api {post} /pizza_orders Request to add Order entry in the DB
 * @apiName AddOrders
 * @apiGroup PizzaOrders
 *
 * @apiHeader {String} authorization Valid JSON Web Token JWT 
 * 
* @apiDescription Add the given passed in order to the DB for the user associated with the 
 * JWT found in the HTTP Request Cookie.
 * @apiParamExample {json} Request-Query-Example:
 *     https://uwnetid-tcss460-w21.herokuapp.com/orders
 * 
 * @apiSuccess {Object[]} orders List of Orders in the database
 * 
 * @apiError (400: SQL Error) {String} message "err.detail"
 * @apiError (400: Invalid Parameters) {String} message "Invalid Input Parameters!"
 * @apiError (400: Missing Parameters) {String} message "Missing Input Parameters!"
 * @apiError (403: JSON Error) {String} message "Token is not valid" when a JWT is provided but it is expired or otherwise not valid
 * @apiError (401: JSON Error) {String} message "Auth token is not supplied" when a JWT is not provided or it is provided in an incorrect format
 * 
 * @apiUse JSONError
 */ 
router.post("/", (request, response, next) => {
    console.log("post pizza_orders!!!!");
    const memberid = request.body.memberid
    const order = request.body.order

    console.log("request.cookies")
    console.log(request.cookies)

    console.log("member id:")
    console.log(memberid)
    console.log("order: ")
    console.log(order);

    console.log("isProvided(memberid)")
    console.log(isProvided(memberid))

    console.log("memberid !== undefined")
    console.log(memberid !== undefined)
    console.log("isProvided(order)")
    console.log(isProvided(order))
    //Verify that the caller supplied all the parameters
    //In js, empty strings or null values evaluate to false
    if(memberid !== undefined && order !== undefined) {

        console.log("typeof(order)")
        console.log(typeof(order))


        if (typeof(order) != "object") {
            console.log("here");
            console.log("Invalid Input Parameters!")
            response.status(400).send({
                message: "Invalid Input Parameters!"
            })
        } else {
            next()
        }

    } else {
        console.log("Missing Input Parameters!")
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

    const theQuery = 'INSERT INTO PizzaOrders(MemberID, OrderDetails) VALUES ($1, $2)      RETURNING*';
    const values = [memberid, order]

    console.log("before query:");
    pool.query(theQuery, values)
        .then(result => { 
            console.log("result");
            response.status(201).send({
                success: true,
                result: result.rows[0]
            })
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
 * @api {delete} /pizza_orders Request to delete a given Order (or all) entries in the DB
 * @apiName DeleteOrders
 * @apiGroup PizzaOrders
 *
 * @apiHeader {String} authorization Valid JSON Web Token JWT 
 * 
 * @apiDescription Delete the given (or all) of the order entries in the DB for the user associated with the 
 * JWT found in the HTTP Request Cookie.
 * 
 * 
 * @apiSuccess {Object[]} orders List of Orders in the database
 * 
 * @apiError (404: No Orders Found) {String} message "No Orders"
 * @apiError (403: JSON Error) {String} message "Token is not valid" when a JWT is provided but it is expired or otherwise not valid
 * @apiError (401: JSON Error) {String} message "Auth token is not supplied" when a JWT is not provided or the cookie is expired
 * @apiError (400: Invalid Parameters) {String} message "Invalid Input Parameters!"
 * 
 * 
 * @apiUse JSONError
 */ 
 router.delete('/', (request ,response) =>{
    
    console.log("delete!!");
    const memberid = request.body.memberid
    const orderNo = request.body.orderno;

    if (orderNo == undefined) { // not passed in
        console.log("orderNo not provided")

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
    } else {
        console.log("orderNo provided")
        console.log(orderNo);
        console.log(typeof(orderNo));

        console.log("typeof: ");
        console.log(typeof(parseInt(orderNo)) != "number")
        console.log("isNaN:")
        console.log(isNaN(parseInt(orderNo)))

        // ensure orderNo is a number, or if it is a string that is a number.
        if (isNaN(parseInt(orderNo))) {
            console.log("not number");
            response.status(400).send({
                message: "Invalid Input Parameters!"
            })
        }
        else {
            console.log("number");


            console.log("memberid is: " + memberid);

            // delete order, and return it.
            const theQuery = 
                `DELETE
                FROM PizzaOrders
                WHERE MemberID=$1 AND OrderID=$2 RETURNING *;`
            let values = [memberid, orderNo]

            pool.query(theQuery, values)
                .then(result => {
                    if (result.rowCount > 0) {
                        console.log("delete one if");
                        response.send({
                            orders: result.rows
                        })
                    } else {
                        console.log("delete one else")
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
        }
    }
})


module.exports = router