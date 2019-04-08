const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};
 

    data.handle = !isEmpty(data.handle) ? data.handle: '';
    data.status = !isEmpty(data.status) ? data.status: '';
    data.skills = !isEmpty(data.skills) ? data.skills: '';

    if(!Validator.isLength(data.handle, {min:2, max:40})) {
        errors.handle = 'Handle needs to be between 2 and 4 char';
    }

    if(Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is Required';
    }

    if(Validator.isEmpty(data.status)) {
        errors.status = 'Status fields is Required';
    }

    if(Validator.isEmpty(data.skills)) {
        errors.skills = 'skills fields is Required';
    }

    if(!isEmpty(data.website)) {
        if(!isValidator.isURL(data.website)) {
            error.website = 'not a valid URL';
        }
    }

    if(!isEmpty(data.facebook)) {
        if(!isValidator.isURL(data.facebook)) {
            error.facebook = 'not a valid URL';
        }
    }

    if(!isEmpty(data.instagram)) {
        if(!isValidator.isURL(data.instagram)) {
            error.instagram = 'not a valid URL';
        }
    }

    if(!isEmpty(data.youtube)) {
        if(!isValidator.isURL(data.youtube)) {
            error.youtube = 'not a valid URL';
        }
    }

    if(!isEmpty(data.linkedin)) {
        if(!isValidator.isURL(data.linkedin)) {
            error.linkedin = 'not a valid URL';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
}
