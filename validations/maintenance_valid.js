const { body, param } = require("express-validator");

const maintenanceDataValidate = [
    body("vehicle")
    .exists()
    .isString()
    .withMessage("Enter vehicle as a string."),
    body("date")
    .exists()
    .isDate()
    .withMessage("The date should be a valid format (YYYY/MM/DD)."),
    body("mileage")
    .exists()
    .isString()
    .withMessage("Enter mileage as a string."),
    body("lubrification")
    .exists()
    .isString()
    .withMessage("Answer for lubrification should be 'No Need', 'Next Visite', or 'Done'.")
    .isIn(["No Need", "Next Visite", "Done"])
    .withMessage("Answer should be 'No Need', 'Next Visite', or 'Done'."),
    body("brakes")
    .exists()
    .isString()
    .withMessage("Answer for brakes should be 'No Need', 'Next Visite', or 'Done'.")
    .isIn(["No Need", "Next Visite", "Done"])
    .withMessage("Answer should be 'No Need', 'Next Visite', or 'Done'."),
    body("mirrors")
    .exists()
    .isString()
    .withMessage("Answer for mirrors should be 'No Need', 'Next Visite', or 'Done'.")
    .isIn(["No Need", "Next Visite", "Done"])
    .withMessage("Answer should be 'No Need', 'Next Visite', or 'Done'."),
    body("tires")
    .exists()
    .isString()
    .withMessage("Answer for tires should be 'No Need', 'Next Visite', or 'Done'.")
    .isIn(["No Need", "Next Visite", "Done"])
    .withMessage("Answer should be 'No Need', 'Next Visite', or 'Done'."),
    body("suspensionSystem")
    .exists()
    .isString()
    .withMessage("Answer for suspension system should be 'No Need', 'Next Visite', or 'Done'.")
    .isIn(["No Need", "Next Visite", "Done"])
    .withMessage("Answer should be 'No Need', 'Next Visite', or 'Done'."),
];

const maintenanceIdValidate = [
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


module.exports = { maintenanceIdValidate, maintenanceDataValidate };