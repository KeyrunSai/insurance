const axios = require('axios');
const config = require('../config');
const loginAPI = config.loginAPI;
const carsAPI = config.carsAPI;

const executeAPI = async (apiConfig) => {
    let res = "";
    await axios(apiConfig)
    .then((response) =>{
        res = response;
    })
    .catch((error) => {
        console.log(`Error while executing API: ${error}`);
        res = error;
    });
    return res;
}

const validateLogin = async (login, password) => {
    let data = {
        "login": login,
        "password": password
      };
    let apiConfig = {
        method: 'POST',
        url: loginAPI,
        headers: { 
            'Content-Type': 'application/json'
        },
        data: data
    };

    return executeAPI(apiConfig).then((response) => {
        if(response.data !== undefined)
            return response.data.loginStatus;
        else{
            console.log(response);
            return undefined;
        }
    });
}

const getCars = async () => {
        
    let apiConfig = {
        method: 'GET',
        url: carsAPI,
        headers: { 
            'Content-Type': 'application/json'
        }
    };
    return executeAPI(apiConfig).then((response) => {
        if(response.data !== undefined)
            return response.data;
        else
            return undefined;
    });
}

var apiService = {
    validateLogin,
    getCars
}

module.exports = {
    apiService
}