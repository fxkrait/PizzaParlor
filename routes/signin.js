//express is the framework we're going to use to handle requests
const express = require('express')

//Access the connection to Heroku Database
const pool = require('../utilities/exports').pool

const getHash = require('../utilities/exports').getHash

const router = express.Router()

const isProvided = require('../utilities/exports').helpers.isProvided

//Pull in the JWT module along with out a secret key
const jwt = require('jsonwebtoken')
const config = {
    secret: process.env.JSON_WEB_TOKEN
}

/**
 * @api {get} /auth Request to sign a user in the system
 * @apiName GetAuth
 * @apiGroup Auth
 * 
 * @apiHeader {String} authorization "username:password" uses Basic Auth 
 * 
 * @apiSuccess {boolean} success true when the name is found and password matches
 * @apiSuccess {String} message "Authentication successful!""
 * @apiSuccess {String} token JSON Web Token
 * 
 *  * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "success": true,
 *       "message": "Authentication successful!",
 *       "token": "eyJhbGciO...abc123"
 *     }
 * 
 * @apiError (400: Missing Authorization Header) {String} message "Missing Authorization Header"
 * 
 * @apiError (400: Malformed Authorization Header) {String} message "Malformed Authorization Header"
 * 
 * @apiError (404: User Not Found) {String} message "User not found"
 * 
 * @apiError (400: Invalid Credentials) {String} message "Credentials did not match"
 * 
 */ 
router.get('/', (request, response, next) => {
    if (isProvided(request.headers.authorization) || request.headers.authorization.startsWith('Basic ')) {
        next()
    } else {
        response.status(400).json({ message: 'Missing Authorization Header' })
    }
}, (request, response, next) => {
    // obtain auth credentials from HTTP Header
    const base64Credentials =  request.headers.authorization.split(' ')[1]
    
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')

    const [email, password] = credentials.split(':')

    if (isProvided(email) && isProvided(password)) {
        request.auth = { 
            "email" : email,
            "password" : password
        }
        next()
    } else {
        response.status(400).send({
            message: "Malformed Authorization Header"
        })
    }
}, (request, response) => {
    console.log("last");
    console.log("email is: " + request.auth.email);

    //console.log("email")
    //console.log(request.decoded.email);
    const theQuery = "SELECT Password, Salt, MemberId FROM Members WHERE Email=$1"
    const values = [request.auth.email]
    pool.query(theQuery, values)
        .then(result => { 
            if (result.rowCount == 0) {
                response.status(404).send({
                    message: 'User not found' 
                })
                return
            }
            let salt = result.rows[0].salt
            //Retrieve our copy of the password
            let ourSaltedHash = result.rows[0].password 

            console.log("ourSaltedHash: " + ourSaltedHash)

            //Combined their password with our salt, then hash
            let theirSaltedHash = getHash(request.auth.password, salt)

            console.log("theirSaltedHash: " + theirSaltedHash)


            //Did our salted hash match their salted hash?
            if (ourSaltedHash === theirSaltedHash ) {
                //credentials match. get a new JWT
                console.log("credentials match")
                let token = jwt.sign( // payload (can include whatever you want in it)
                    {
                        "email": request.auth.email,
                        "memberid": result.rows[0].memberid
                    },
                    config.secret, // secret means it will be encoded using our JSON_WEB_TOKEN value (but anything in payload can be easily decrypted)
                    // so don't store sensitive data in payload
                    { 
                        expiresIn: '14 days' // expires in 14 days
                    }
                )
                response.cookie('access_token', 'Bearer ' + token,
                    {
                        expires: new Date(Date.now() + 14 * 24 * 60 * 60000),
                        httpOnly: true // client side can't access cookie
                        
                    })
                //use this cookie client side to know if a user is signed in    
                response.cookie('authorized', true,
                    {
                        expires: new Date(Date.now() + 14 * 24 * 60 * 60000),
                        //note this cookie is NOT httpOnly                   
                        httpOnly: false     
                    })

                //package and send the results
                response.json({
                    success: true,
                    message: 'Authentication successful!',
                    token: token,
                    "memberid": result.rows[0].memberid          
                })
            } else {
                //credentials dod not match
                console.log("credentials did not match")
                response.status(400).send({
                    message: 'Credentials did not match' 
                })
            }
        })
        .catch((err) => {
            //log the error
            console.log(err.stack)
            response.status(400).send({
                message: err.detail
            })
        })
})

router.delete("/", (request, response) => { 

    response.cookie('access_token',  '',
    {
        // signed: true,
        expires: new Date(Date.now()),
        httpOnly: true
        
    }).cookie('authorized',  false,
    {
        // signed: true,
        expires: new Date(Date.now()),
        httpOnly: false
    }).send({ 'deleted' :true})
})

module.exports = router