//express is the framework we're going to use to handle requests
const express = require('express')

const router = express.Router()
 
const pool = require('../utilities/exports').pool

const isProvided = require('../utilities/exports').helpers.isProvided



function parseJwt(token) {
    var base64Payload = token.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
  }

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
//router.post("/", (request, response, next) => {
    /*let memberID = request.decoded.memberid
    console.log("memberID: " + memberID);*/
    //console.log("first get!");
    //console.log("request.cookies:")
    //console.log(request.cookies)
    //console.log("request.cookies['access_token']");
    //console.log(request.cookies["access_token"]);
  /*  let access_token = request.cookies["access_token"];
    let authorized = request.cookies["authorized"];
    if (access_token != undefined && access_token.startsWith('Bearer ')
    && authorized != undefined && authorized === "true") {
        console.log("valid JWT token in Cookie");
        next();
    } else {
        response.status(400).send({
            message: "JWT stored in Cookie Missing!"
        })
    }
*/

    /*if (isProvided(email) && isProvided(password)) {
        request.auth = { 
            "email" : email,
            "password" : password
        }
        //request.MemberID = request.memb
        next()
    } else {
        response.status(400).send({
            message: "Malformed Authorization Header"
        })
    }*/
/*}, (request, response, next) => {
    let memberID = request.decoded.memberid
    console.log("memberID: " + memberID);

    next();*/
    /*if (isProvided(email) && isProvided(password)) {
        request.auth = { 
            "email" : email,
            "password" : password
        }
        //request.MemberID = request.memb
        next()
    } else {
        response.status(400).send({
            message: "Malformed Authorization Header"
        })
    }*/
//}, (request, response, next) => {
router.post("/", (request, response, next) => {
    console.log("post!!!!");
    console.log("node 2");
    const size = request.body.size
    const color = request.body.color
    const option1 = request.body.option1
    const option2 = request.body.option2
    const option3 = request.body.option3

    const postgresValidBooleanValues = ['TRUE', 't', 'true', 'y', 'yes', 'on','1',
                                        'FALSE', 'f', 'false', 'n', 'no', 'off', '0']

    //Verify that the caller supplied all the parameters
    //In js, empty strings or null values evaluate to false
    if(isProvided(size) && isProvided(color) && isProvided(option1) && isProvided(option2) && isProvided(option3)) {
        if ((size === "small" || size === "medium" || size == "large")
            && (color === "red" || color === "green" || color == "blue")
            && postgresValidBooleanValues.includes(option1)
            && postgresValidBooleanValues.includes(option2)
            && postgresValidBooleanValues.includes(option3) ) {
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
    const size = request.body.size
    const color = request.body.color
    const option1 = request.body.option1
    const option2 = request.body.option2
    const option3 = request.body.option3
    const memberID = request.decoded.memberid
    console.log("typeof(memberID): " + typeof(memberID));

    console.log("request.body.memberid: " + request.body.memberid);
    console.log("request.memberid: " + request.memberid);

    console.log("size: " + size + ", color: " + color + ", option1: " + option1 + ", option2: " + option2 + ", option3: " + option3 + ", memberID: " + memberID);

    /*const theQuery = `INSERT INTO Orders(MemberID, My_Size, My_Color, Option1, Option2, Option3) SELECT {{request.memberid}}, {{size}}, {{color}}, `+
                     `{{option1}}, {{option2}}, {{option3}}`  + 
                     `FROM Members WHERE Members.Email={{request.header.email}} RETURNING *;`*/

    //const theQuery = 'INSERT INTO Orders(MemberID, My_Size, My_Color, Option1, Option2, Option3) VALUES ($1, $2, $3, $4, $5, $6) RETURNING*';
    const theQuery = 'INSERT INTO Orders(MemberID, My_Size, My_Color, Option1, Option2, Option3) VALUES ($1, $2, $3, $4, $5, $6)      RETURNING*';
    const values = [memberID, size, color, option1, option2, option3]
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
                    result: result
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
 * @api {get} /orders Request to get all Order entries in the DB
 * @apiName GetOrders
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
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 * @apiError (403: JSON Error) {String} message "Token is not valid" when a JWT is provided but it is expired or otherwise not valid
 * @apiError (401: JSON Error) {String} message "Auth token is not supplied" when a JWT is not provided or it is provided in an incorrect format
 * 
 * @apiUse JSONError
 */ 

//router.get("/", (request, response, next) => {
    /*let memberID = request.decoded.memberid
    console.log("memberID: " + memberID);*/
    //console.log("first get!");
    //console.log("request.cookies:")
    //console.log(request.cookies)


    //console.log("request.cookies['access_token']");
    //console.log(request.cookies["access_token"]);
  /*  let access_token = request.cookies["access_token"];
    let authorized = request.cookies["authorized"];
    if (access_token != undefined && access_token.startsWith('Bearer ')
    && authorized != undefined && authorized === "true") {
        console.log("valid JWT token in Cookie");
        next();
    } else {
        response.status(400).send({
            message: "JWT stored in Cookie Missing!"
        })
    }
*/

    /*if (isProvided(email) && isProvided(password)) {
        request.auth = { 
            "email" : email,
            "password" : password
        }
        //request.MemberID = request.memb
        next()
    } else {
        response.status(400).send({
            message: "Malformed Authorization Header"
        })
    }*/
//},
//(request, response) => {
router.get("/", (request, response) => {
    console.log("get!!!");
    // const theQuery = 
    //     `SELECT My_Size, My_Color, Option1, Option2, Option3 
    //      FROM Orders`

    const theQuery = 
        `SELECT My_Size, My_Color, Option1, Option2, Option3 
         FROM Orders
         WHERE MemberID=$1`
    let values = [request.decoded.memberid]

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

module.exports = router