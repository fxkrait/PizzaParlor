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
 * @api {post} /demosql Request to add someone's name to the DB
 * @apiName PostDemoSql
 * @apiGroup DemoSql
 * 
 * @apiParam {String} name someone's name 
 * @apiParam {String} message a message to store with the name
 * 
 * @apiParamExample {json} Request-Body-Example:
 *     {
 *       "name": "Charles",
 *       "message": "Hello World"
 *     }
 * 
 * @apiSuccess (Success 201) {boolean} success true when the name is inserted
 * @apiSuccess (Success 201) {String} message The string "Inserted: " followed by the value of the input parameter `name`  
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "success": true,
 *       "message": "Inserted: Charles"
 *     }
 * 
 * @apiError (400: Name exists) {String} message "Name exists"
 * 
 * @apiError (400: Missing Parameters) {String} message "Missing required information"
 * 
 * @apiError (400: SQL Error) {String} message the reported SQL error details
 * 
 * @apiUse JSONError
 */ 
router.post("/", (request, response) => {

    if (isProvided(request.body.name) && isProvided(request.body.message)) {
        const theQuery = "INSERT INTO DEMO(Name, Message) VALUES ($1, $2) RETURNING *"
        const values = [request.body.name, request.body.message]

        pool.query(theQuery, values)
            .then(result => {
                response.status(201).send({
                    success: true,
                    message: "Inserted: " + result.rows[0].name
                })
            })
            .catch(err => {
                //log the error
                console.log(err)
                if (err.constraint == "demo_name_key") {
                    response.status(400).send({
                        message: "Name exists"
                    })
                } else {
                    response.status(400).send({
                        message: err.detail
                    })
                }
            }) 
            
    } else {
        response.status(400).send({
            message: "Missing required information"
        })
    }    
})
// router.post("/", async (request, response) => {

//     if (isProvided(request.body.name) && isProvided(request.body.message)) {
//         const theQuery = "INSERT INTO DEMO(Name, Message) VALUES ($1, $2) RETURNING *"
//         const values = [request.body.name, request.body.message]

//         try {
//             const result = await pool.query(theQuery, values);
//             if (result) {
//                 response.status(201).send({
//                     success: true,
//                     message: "Inserted: " + result.rows[0].name
//                 })
//             }
//         } catch (error) {
//             //log the error
//             // console.log(error)
//             if (error.constraint == "demo_name_key") {
//                 response.status(400).send({
//                     message: "Name exists"
//                 })
//             } else {
//                 response.status(400).send({
//                     message: error.detail
//                 })
//             }
//         }   
//     } else {
//         response.status(400).send({
//             message: "Missing required information"
//         })
//     }    
// })

/**
 * @api {get} /demosql/:name? Request to get all (or specific) demo entries in the DB
 * @apiName GetDemoSql
 * @apiGroup DemoSql
 * 
 * @apiParam {String} [name] the name to look up. If no name provided, all names are returned
 * 
 * @apiParamExample {json} Request-Query-Example:
 *     https://uwnetid-tcss460-w21.herokuapp.com/demosql/charles
 * 
 * @apiSuccess {boolean} success true when the name is inserted
 * @apiSuccess {Object[]} names List of names in the Demo DB
 * @apiSuccess {String} names.name The name
 * @apiSuccess {String} names.message The message associated with the name
 * 
 * @apiError (404: Name Not Found) {String} message "Name not found"

 * @apiError (400: SQL Error) {String} message the reported SQL error details
 * 
 * @apiUse JSONError
 */ 
router.get("/:name?", (request, response) => {

    const theQuery = 'SELECT name, message FROM Demo WHERE name LIKE $1'
    const values = [isProvided(request.params.name) ? request.params.name : '%' ]

    pool.query(theQuery, values)
        .then(result => {
            if (result.rowCount > 0) {
                response.send({
                    success: true,
                    names: result.rows
                })
            } else {
                response.status(404).send({
                    message: "Name not found"
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
 * @api {put} /demosql Request to replace the message entry in the DB for name
 * @apiName PutDemoSql
 * @apiGroup DemoSql
 * 
 * @apiParamExample {json} Request-Body-Example:
 *     {
 *       "name": "Charles",
 *       "message": "Hello World UPDATED!"
 *     }
 * 
 * @apiParam {String} name the name entry  
 * @apiParam {String} message a message to replace with the associated name
 * 
 * @apiSuccess {boolean} success true when the name is inserted
 * @apiSuccess {String} message The string "Updated: " followed by the value of the input parameter `name`
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "message": "Updated: Charles"
 *     }
 * 
 * @apiError (404: Name Not Found) {String} message "Name not found"
 * 
 * @apiError (400: Missing Parameters) {String} message "Missing required information"
 * 
 * @apiError (400: SQL Error) {String} message the reported SQL error details
 * 
 * @apiUse JSONError
 */ 
router.put("/", (request, response) => {

    if (isProvided(request.body.name) && isProvided(request.body.message)) {
        const theQuery = "UPDATE Demo SET message = $1 WHERE name = $2 RETURNING *"
        const values = [request.body.message, request.body.name]

        pool.query(theQuery, values)
            .then(result => {
                if (result.rowCount > 0) {
                    response.send({
                        success: true,
                        message: "Updated: " + result.rows[0].name
                    })
                } else {
                    response.status(404).send({
                        message: "Name not found"
                    })
                }
            })
            .catch(err => {
                //log the error
                // console.log(err)
                response.status(400).send({
                    message: err.detail
                })
            }) 
    } else {
        response.status(400).send({
            message: "Missing required information"
        })
    } 
})

/**
 * @api {delete} /demosql/:name Request to remove entry in the DB for name
 * @apiName DeleteDemoSql
 * @apiGroup DemoSql
 * 
 * @apiParam {String} name the name entry  to delete
 * 
 * @apiParamExample {json} Request-Query-Example:
 *     https://uwnetid-tcss460-w21.herokuapp.com/demosql/charles
 * 
 * @apiSuccess {boolean} success true when the name is delete
 * @apiSuccess {String} message The string "Deleted: " followed by the value of the input parameter `name`
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "message": "Deleted: Charles"
 *     }
 * 
 * @apiError (404: Name Not Found) {String} message "Name not found"
 * 
 * @apiError (400: Missing Parameters) {String} message "Missing required information"
 * 
 * @apiError (400: SQL Error) {String} message the reported SQL error details
 * 
 * @apiUse JSONError
 */ 
//router.delete("/:name", (request, response) => {
router.delete("/:name?", (request, response) => {
        

    if (isProvided(request.params.name)) {
        const theQuery = "DELETE FROM Demo  WHERE name = $1 RETURNING *"
        const values = [request.params.name]

        pool.query(theQuery, values)
            .then(result => {
                if (result.rowCount == 1) {
                    response.send({
                        success: true,
                        message: "Deleted: " + result.rows[0].name
                    })
                } else {
                    response.status(404).send({
                        message: "Name not found"
                    })
                }
            })
            .catch(err => {
                //log the error
                // console.log(err)
                response.status(400).send({
                    message: err.detail
                })
            }) 
    } else {
        response.status(400).send({
            message: "Missing required information"
        })
    } 
})

module.exports = router