const fs = require('fs');
const path = require('path');

const regex = new RegExp(process.argv[2]);
const inputs = process.argv.slice(3);

function searchFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        if (regex.test(content)) {
            console.log(filePath);
        }
    } catch (error) {
        console.error(`Error reading ${filePath}: ${error}`);
    }
}

function searchDirectory(directoryPath) {
    try {
        const files = fs.readdirSync(directoryPath);
        for (const file of files) {
            const filePath = path.join(directoryPath, file);
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                searchDirectory(filePath);
            } else {
                searchFile(filePath);
            }
        }
    } catch (error) {
        console.error(`Error reading ${directoryPath}: ${error}`);
    }
}

function main() {
    for (const input of inputs) {
        const stats = fs.statSync(input);
        if (stats.isDirectory()) {
            searchDirectory(input);
        } else {
            searchFile(input);
        }
    }
}
main();

/*
    Open the terminal and use this command:
    node searchTool.js Hey test-dir
    // OUTPUT: test-dir/test.txt
*/
