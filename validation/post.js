const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
    let errors = {};
 

    data.text = !isEmpty(data.text) ? data.text: '';
    data.url = !isEmpty(data.url) ? data.url: ''; 

    console.log(data.text);
    if(Validator.isEmpty(data.text)) {
        errors.text = "Text field is Required";
    }

    if(Validator.isEmpty(data.url)) {
        errors.text = "URL field is Required";
    }

    if(!Validator.isLength(data.text, {min: 10, max: 300})) {
        errors.text = 'Post must be between 10 and 300 chars';
    }



    return {
        errors,
        isValid: isEmpty(errors),
    };
}
