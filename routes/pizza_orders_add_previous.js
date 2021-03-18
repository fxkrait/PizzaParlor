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
 * @api {post} /pizza_orders_add_previous Request to re-order existing Order entry in the DB
 * @apiName OrdersAddPrevious
 * @apiGroup PizzaOrders_add_previous
 *
 * @apiHeader {String} authorization Valid JSON Web Token JWT 
 * 
 * @apiDescription Add the given previous order (using given order id) to the DB for the user associated with the 
 * JWT found in the HTTP Request Cookie.
 * 
 * @apiParamExample {json} Request-Query-Example:
 *     https://uwnetid-tcss460-w21.herokuapp.com/orders
 * 
 * @apiSuccess {Object[]} orders List of Orders in the database
 * 
 * @apiError (400: SQL Error) {String} message "err.detail"
 * @apiError (404: No Orders Found in Get) {String} message "User or orderid not found"
 * @apiError (404: Nothing outputted from insertion) {String} message "User not found"
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
    const orderid = request.body.orderid

    console.log("member id:")
    console.log(memberid)
    console.log("orderid: ")
    console.log(orderid);

    console.log("isProvided(memberid)")
    console.log(isProvided(memberid))

    console.log("memberid !== undefined")
    console.log(memberid !== undefined)
    console.log("isProvided(order)")
    console.log(isProvided(orderid))
    console.log("typeof(orderid) === 'number'")
    console.log(typeof(orderid) == "number")
    
    //Verify that the caller supplied all the parameters
    //In js, empty strings or null values evaluate to false
    if(memberid !== undefined && orderid !== undefined) {
        next()

    } else {
        console.log("Missing Input Parameters!")
        response.status(400).send({
            message: "Missing Input Parameters!"
        })
    } 
}, (request, response, next) => {
    const memberid = request.body.memberid
    const orderid = request.body.orderid

    if(typeof(orderid) != "number") {
        console.log("Invalid Input Parameters!")
        response.status(400).send({
            message: "Invalid Input Parameters!"
        })
    
    } else {
        next()
    }

},


(request, response) => {
    console.log("last node");
    const memberid = request.body.memberid
    const orderid = request.body.orderid
    console.log("typeof(memberID): " + typeof(memberID));

    console.log("request.body.memberid: " + request.body.memberid);


    // get order
    const getQuery = 
    `SELECT *
     FROM PizzaOrders
     WHERE MemberID=$1 AND OrderID=$2`
    const getValues = [memberid, orderid]
    console.log("before query:");
    pool.query(getQuery, getValues)
        .then(result => { 
            console.log("result");
            if (result.rowCount == 0) { // no order matches
                response.status(404).send({
                    message: 'User or orderid not found' 
                })
                return
            } else { // yes, an order matches

                //console.log("result.rows[0].orderdetails is: ")
                //console.log(result.rows[0].orderdetails)
                
                let order = result.rows[0].orderdetails;
                console.log("order gotten is: ")
                console.log(order)

                // then insert that order

                //const theQuery = 'INSERT INTO Orders(MemberID, My_Size, My_Color, Option1, Option2, Option3) VALUES ($1, $2, $3, $4, $5, $6) RETURNING*';
                const theQuery = 'INSERT INTO PizzaOrders(MemberID, OrderDetails) VALUES ($1, $2)      RETURNING*';
                const values = [memberid, order]
 
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
                                result: result.rows[0]
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





    // //const theQuery = 'INSERT INTO Orders(MemberID, My_Size, My_Color, Option1, Option2, Option3) VALUES ($1, $2, $3, $4, $5, $6) RETURNING*';
    // const theQuery = 'INSERT INTO PizzaOrders(MemberID, OrderDetails) VALUES ($1, $2)      RETURNING*';
    // const values = [memberid, order]
    // /*console.log("before query:");
    // pool.query(theQuery, values)
    // .then(result => { 
    //     console.log("result");
    // })
    // .catch((err) => {
    //     console.log("ERROR!");
    //     //log the error
    //     console.log(err.stack)
    //     response.status(400).send({
    //         message: err.detail
    //     })
    // })*/
    // console.log("before query:");
    // pool.query(theQuery, values)
    //     .then(result => { 
    //         console.log("result");
    //         if (result.rowCount == 0) {
    //             response.status(404).send({
    //                 message: 'User not found' 
    //             })
    //             return
    //         } else {
    //             response.status(201).send({
    //                 success: true,
    //                 result: result.fields
    //             })
    //         }
    //     })
    //     .catch((err) => {
    //         console.log("ERROR!");
    //         //log the error
    //         console.log(err.stack)
    //         response.status(400).send({
    //             message: err.detail
    //         })
    //     })
})


module.exports = router