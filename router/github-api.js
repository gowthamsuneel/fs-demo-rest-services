const express = require("express");
const router = express.Router();
const axios = require("axios");
const instance = axios.create({
    baseURL: `https://api.github.com/search`,
    method: 'get'
});


const utils = promise => (
    promise
      .then(data => ({ data, error: null }))
      .catch(error => ({ error, data: null }))
  );
  
  module.exports = utils;

/**
 * To fetch public repositaries from github
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
router.get('/repositories1', async (req, res) => {
    try {
        
        let obj = {
            url: `/repositories`,
            // params: {
            //     q: req.query.q || "stars:>0",
            //     sort: "stars",
            //     order: req.query.order || "desc",
            //     per_page: req.query.per_page || 50
            // }
            params: dynamicFilter(req.query)
        }
        //throw new Error("Unexpected error")
        let response = await instance.request(obj);
        let parseddata = response.data.items.map(e => { return { id: e.id, stars: e.stargazers_count, created_at: e.created_at } })
        res.status(200).send(successResponse("success", parseddata.length, response.data.items))
    } catch (error) {
        console.log(`api error ---> ${error}`)
        res.status(500).send(failedResponse(error.code, '', data = [], error.message))
    }

})


router.get('/repositories', async (req, res, next) => {
  
        let result = dynamicFilter(req.query);
        let obj = {
            url: `/repositories`,
            params: result
        }
     let { error, data }= await utils(instance.request(obj))
     if(data != null){
        let parseddata = data.data.items.map(e => { return { id: e.id, stars: e.stargazers_count, created_at: e.created_at } })
        res.status(200).send(successResponse("success", parseddata.length, parseddata))  
     }
     next(error)
     
    

})

function middleware(err,req,res,next){
   if(true)next()
   else throw "unhandled error"    
}

function dynamicFilter(params) {
    //throw new Error("unhandled error")   
    let payload = {
       q:"created:>2022-01-01",
        order: "desc"
    }
    for (let param in params) {
        let value = params[param]
        if (value && typeof value != undefined && value != "") {
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
function successResponse(status, size, data) {
    return {
        status: status,
        page_size: size,
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