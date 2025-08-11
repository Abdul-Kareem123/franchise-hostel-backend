const { check, param, query } = require('express-validator');
import { ErrorMessage } from '../helper/ErrorMessage';
import { body } from 'express-validator';



/**
 * @author Mohanraj V / Santhosh
 * @date  07-09-2023
 * @description Function to check for the Validation of Query
 * @param {string} id
 * @param {boolean} isRequired
 */

export let checkQuery = (id) => {
    return query(id, ErrorMessage.id.required).isLength({ min: 1 })
        .trim()
        .exists()
}

/**
 * @author Mohanraj V / Santhosh
 * @date  07-09-2023
 * @description Function to check for the Validation of Params
 * @param {string} id
 * @param {boolean} isRequired
 */

export let checkParam = (id) => {
    return param(id, ErrorMessage.id.required)
        .trim()
        .exists()
}

/**
 * @author M0hanraj V / Santhosh
 * @date  22-09-2023
 * @description Function to check for the Validation of boady arguments
 * @param {string} val
 * @param {boolean} isRequired
 */
export let checkRequestBodyParams = (val) => {
    return body(val, ErrorMessage.general.required).isLength({ min: 1 })
        .trim()
        .exists().withMessage(ErrorMessage.general.required)
}

/**
 * @author Abdul
 * @date  07-08-2025
 * @description Functions to check for the Validation of body arguments
 */

export const checkRequiredString = (field: string, errorKey: keyof typeof ErrorMessage) => {
  const error = ErrorMessage[errorKey];
  return body(field)
    .notEmpty().withMessage(error.required)
    .isString().withMessage(error.validation);
};

export const checkRequiredEmail = (field: string) => {
  return body(field)
    .notEmpty().withMessage(ErrorMessage.email.required)
    .isEmail().withMessage(ErrorMessage.email.validation);
};

export const checkRequiredDate = (field: string) => {
  return body(field)
    .notEmpty().withMessage(ErrorMessage.date.required)
    .custom(value => !isNaN(Date.parse(value)))
    .withMessage(ErrorMessage.date.validation);
};

export const bookingValidationRules = [
  checkRequiredString('customerName', 'name'),
  checkRequiredEmail('customerEmail'),
  checkRequiredString('room', 'id'),
  checkRequiredDate('startDate'),
  checkRequiredDate('endDate'),
];