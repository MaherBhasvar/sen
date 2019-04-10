const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSearchInput(data) {
    let errors = {};
 

    data.search = !isEmpty(data.search) ? data.search: '';



    if(Validator.isEmpty(data.search)) {
        errors.search = "Search term is Required";
    }



    return {
        errors,
        isValid: isEmpty(errors),
    };
}
