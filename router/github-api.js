const express = require("express");
const router = express.Router();
const axios = require("axios");
const instance = axios.create({
    baseURL: `https://api.github.com/search`,
    method: 'get'
});




/**
 * To fetch public repositaries from github
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
router.get('/repositories', async (req, res) => {
    try {
        let obj = {
            url: `/repositories`,
            // params: {
            //     q: req.query.q || "stars:>0",
            //     sort: "stars",
            //     order: req.query.order || "desc",
            //     per_page: req.query.per_page || 50
            // }
            params:dynamicFilter(req.query)
        }

        let response = await instance.request(obj);
        res.status(200).send(successResponse("success", response.data.items))
    } catch (error) {
        console.log(`api error ---> ${error}`)
        res.status(200).send(failedResponse(error.code, '', data = [], error.message))
    }

})


function dynamicFilter(params){
    let payload = {q: "stars:>0",
    order:  "desc"}
    for(let param in params){
        let value = params[param]
        if(value && typeof value != undefined && value != ""){
            payload[param] = value
        }
    }
    return payload
}

/**
 * Success response send back to ui
 * @param {String} status 
 * @param {Array} data 
 * @returns 
 */
function successResponse(status, data) {
    return {
        status: status,
        data: data
    }
}


/**
 * Failed response send back to ui
 * @param {String} status 
 * @param {String} message 
 * @param {Array} data 
 * @param {Object} error 
 * @returns 
 */
function failedResponse(status, message, data, error) {
    return {
        status: status,
        message: message,
        data: data,
        error: error
    }
}

module.exports = router;