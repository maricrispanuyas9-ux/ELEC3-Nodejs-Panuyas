/*
Name: Maricris Panuyas
Section: IV-BSITC
Activity: N2 - Modular Calculator
Date: November 22, 2026
*/

// Import the custom modules.
const operations = require("./operations");
const { formatResult } = require("./formatter");

// Import the built-in Node.js path module.
const path = require("path");

// Read the operation and numbers from the terminal.
const operation = process.argv[2];
const firstInput = process.argv[3];
const secondInput = process.argv[4];

// Display the program name using the path module.
console.log("Program:", path.basename(__filename));

// Check if the operation is supported.
if (!Object.prototype.hasOwnProperty.call(operations, operation)) {
    console.log("Error: Unknown operation.");
    console.log("Use: add, subtract, multiply, divide, or average.");
} else if (
    firstInput === undefined ||
    secondInput === undefined ||
    firstInput.trim() === "" ||
    secondInput.trim() === "" ||
    !Number.isFinite(Number(firstInput)) ||
    !Number.isFinite(Number(secondInput))
) {
    console.log("Error: Please enter two valid numbers.");
} else {
    const a = Number(firstInput);
    const b = Number(secondInput);

    try {
        // Run the selected operation.
        const result = operations[operation](a, b);

        // Display the formatted result.
        console.log(formatResult(operation, a, b, result));
    } catch (error) {
        // Show an error without crashing the program.
        console.log("Error:", error.message);
    }
}
