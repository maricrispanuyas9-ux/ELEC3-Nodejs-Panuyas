
/*
Name: Maricris Panuyas
Section: IV-BSITC
Activity: N3 - File Manager
*/

const fs = require("fs");
const path = require("path");

const folderPath = path.join(__dirname, "files");
fs.mkdirSync(folderPath, { recursive: true });

const command = process.argv[2];
const fileName = process.argv[3];
const content = process.argv.slice(4).join(" ");

function getFilePath(name) {
    if (
        !name ||
        path.basename(name) !== name ||
        !name.endsWith(".txt") ||
        name === "." ||
        name === ".."
    ) {
        throw new Error("Please enter a valid .txt filename.");
    }

    return path.join(folderPath, name);
}

try {
    if (command === "list") {
        const files = fs.readdirSync(folderPath);

        if (files.length === 0) {
            console.log("No files found.");
        } else {
            files.forEach((name) => {
                const fullPath = path.join(folderPath, name);

                if (fs.statSync(fullPath).isFile()) {
                    console.log("----------------------");
                    console.log("Full Path:", fullPath);
                    console.log("File Name:", path.basename(fullPath));
                    console.log("Extension:", path.extname(fullPath));
                    console.log("Content:", fs.readFileSync(fullPath, "utf8"));
                }
            });
        }
    } else if (["create", "read", "update", "delete"].includes(command)) {
        const filePath = getFilePath(fileName);

        if (command === "create") {
            fs.writeFileSync(filePath, content);
            console.log("File created:", fileName);

        } else if (command === "read") {
            if (!fs.existsSync(filePath)) {
                console.log("Error: File does not exist.");
            } else {
                console.log("Content:", fs.readFileSync(filePath, "utf8"));
            }

        } else if (command === "update") {
            if (!fs.existsSync(filePath)) {
                console.log("Error: File does not exist.");
            } else {
                fs.appendFileSync(filePath, "\n" + content);
                console.log("File updated:", fileName);
            }

        } else if (command === "delete") {
            if (!fs.existsSync(filePath)) {
                console.log("Error: File does not exist.");
            } else {
                fs.unlinkSync(filePath);
                console.log("File deleted:", fileName);
            }
        }
    } else {
        console.log("Invalid command.");
        console.log("Use: create, read, update, delete, or list.");
    }
} catch (error) {
    console.log("Error:", error.message);
}
