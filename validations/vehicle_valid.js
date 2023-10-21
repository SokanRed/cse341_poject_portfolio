const { body, param } = require("express-validator");

const vehicleDataValidate = [
    body("brand")
    .exists()
    .isString()
    .withMessage("Enter brand as a string."),
    body("model")
    .exists()
    .isString()
    .withMessage("Enter model as a string."),
    body("horsePower")
    .exists()
    .isString()
    .withMessage("Enter number as a string."),
    body("fuelType")
    .exists()
    .isString()
    .withMessage("Enter fuel as a string"),
    body("color")
    .exists()
    .isString()
    .withMessage("Enter color as a string."),
    body("category")
    .exists()
    .withMessage("Enter category as a string.")
    .isString(),
    body("transmission")
    .exists()
    .isString()
    .withMessage("Enter transmission as a string."),
    body("numberPassenger")
    .exists()
    .isString()
    .withMessage("Enter number of passsenger as a string."),
];

const vehicleIdValidate = [
    param("id")
    .exists()
    .custom((value) => {
        if (value.length !== 24) {
            return Promise.reject("The Id should have 24 caracters.");
        } else {
            return true;
        }
    })
    .withMessage("The number of caracters must be 24")
]


module.exports = { vehicleIdValidate, vehicleDataValidate };