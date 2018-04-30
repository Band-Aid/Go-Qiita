//todo - need to change API calls to handle with this library 
/**
 * @fileoverview A library for making requests to the Box or ML provider APIs.
 */

const axios = require('axios');

class APIRequestManager {
    static get(url, headers = {}, params = {}) {
        return axios.get(url, { headers }, { params });
    }

    static post(url, headers = {}, data = {}) {
        return axios.post(url, data, { headers });
    }

    static delete(url, headers = {}) {
        return axios.delete(url, { headers });
    }
}

module.exports = APIRequestManager;