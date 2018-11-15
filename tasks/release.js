const fs = require('fs');
const { promisify } = require('util');
const exec = require('child_process').exec;
copyFile = promisify(fs.copyFile);

const releaseType = process.argv[2].split('=')[1];


exec(`npm version ${releaseType}`, (err, str, stderr) => {
    if (!err) {
        copyFile('./package.json', './dist/package.json');
        copyFile('../LICENSE', '../dist/LICENSE');
        copyFile('./README.md', './dist/README.md');
    }
});

