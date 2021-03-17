//express is the framework we're going to use to handle requests
const express = require('express')

//We use this create the SHA256 hash
const crypto = require("crypto")

//Access the connection to Heroku Database
const pool = require('../utilities/exports').pool

const getHash = require('../utilities/exports').getHash

const isProvided = require('../utilities/exports').helpers.isProvided
const { request } = require('express')

const router = express.Router()

/**
 * @api {post} /auth Request to register a user
 * @apiName PostAuth
 * @apiGroup Auth
 * 
 * @apiParam {String} first a users first name
 * @apiParam {String} last a users last name
 * @apiParam {String} email a users email *unique
 * @apiParam {String} password a users password
 * @apiParam {String} [username] a username *unique, if none provided, email will be used
 * 
 * @apiParamExample {json} Request-Body-Example:
 *  {
 *      "first":"Charles",
 *      "last":"Bryan",
 *      "email":"cfb3@fake.email",
 *      "password":"test12345"
 *  }
 * 
 * @apiSuccess (Success 201) {boolean} success true when the name is inserted
 * @apiSuccess (Success 201) {String} email the email of the user inserted 
 * 
 * @apiError (400: Missing Parameters) {String} message "Missing required information"
 * 
 * @apiError (400: Username exists) {String} message "Username exists"
 * 
 * @apiError (400: Email exists) {String} message "Email exists"
 * 
 */ 
router.post('/', (request, response, next) => { // check everything is provided

    //Retrieve data from query params
    const first = request.body.first
    const last = request.body.last
    const email = request.body.email
    const password = request.body.password
    //Verify that the caller supplied all the parameters
    //In js, empty strings or null values evaluate to false
    if(isProvided(first) && isProvided(last) && isProvided(email) && isProvided(password)) {
        next()
    } else {
        response.status(400).send({
            message: "Missing required information"
        })
    }
}, (request, response, next) => { // password requirement middleware

    const password = request.body.password


    // https://stackoverflow.com/questions/1559751/regex-to-make-sure-that-the-string-contains-at-least-one-lower-case-char-upper
    let capitalsRegex = new RegExp("(?=.*[A-Z])");    // use positive look ahead to see if at least one upper case letter exists
    let digitRegex = new RegExp("[0-9]");           // use positive look ahead to see if at least one digit exists

    let validPassword = true; 
    let message = "";

    if (password == undefined || password == null || password == "") {
        message = "password should not be blank!";
        validPassword = false;
    } else if (password.length < 8) {
        message = "password should be atleast 8 characters!";
        validPassword = false;
    } else if (!capitalsRegex.test(password)) {
        message = "Your password needs a capital letter!";
        validPassword = false;
    } else if (!digitRegex.test(password)) {
        message = "Your password needs atleast one number!";
        validPassword = false;
    }

    if (!validPassword) {
        //             message: "Missing required information"
        response.status(400).send({
            message: message
        })
    } else {
        console.log("else");
        next();
    }

},  (request, response) => {

    //Retrieve data from query params
    const first = request.body.first
    const last = request.body.last
    const email = request.body.email
    const password = request.body.password
    //Verify that the caller supplied all the parameters
    //In js, empty strings or null values evaluate to false
    if(isProvided(first) && isProvided(last) && isProvided(email) && isProvided(password)) {
        //We're storing salted hashes to make our application more secure
        //If you're interested as to what that is, and why we should use it
        //watch this youtube video: https://www.youtube.com/watch?v=8ZtInClXe1Q
        let salt = crypto.randomBytes(32).toString("hex")
        let salted_hash = getHash(password, salt)
        
        //We're using placeholders ($1, $2, $3) in the SQL query string to avoid SQL Injection
        //If you want to read more: https://stackoverflow.com/a/8265319
        let theQuery = "INSERT INTO MEMBERS(FirstName, LastName, Email, Password, Salt) VALUES ($1, $2, $3, $4, $5) RETURNING Email"
        let values = [first, last, email, salted_hash, salt]
        pool.query(theQuery, values)
            .then(result => {
                //We successfully added the user!
                response.status(201).send({
                    success: true,
                    email: result.rows[0].email
                })
            })
            .catch((error) => {
                //log the error
                // console.log(error)
                if (error.constraint == "members_email_key") {
                    response.status(400).send({
                        message: "Email exists"
                    })
                } else {
                    response.status(400).send({
                        message: error.detail
                    })
                }
            })
    } else {
        response.status(400).send({
            message: "Missing required information"
        })
    }
})

router.get('/hash_demo', (request, response) => {
    let password = 'hello12345'

    let salt = crypto.randomBytes(32).toString("hex")
    let salted_hash = getHash(password, salt)
    let unsalted_hash = getHash(password)

    response.status(200).send({
        'salt': salt,
        'salted_hash': salted_hash,
        'unsalted_hash': unsalted_hash
    })
})


module.exports = router