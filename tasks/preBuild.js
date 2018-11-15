//TODO: BOOTSTRAP STYLE FILES INTO THE APPROPIATE DIRECTORY TO BE IMPORTED BY USERS
const fs = require('fs');
const path = require('path');
const sass = require('node-sass');


const copyFolderRecursively = function (from, to) {
    if (fs.existsSync(from)) {
        if (!fs.existsSync(to)) {
            fs.mkdirSync(to);
        }
        fs.readdirSync(from).forEach(function (file, index) {
            var curFrom = from + "/" + file;
            var curTo = to + "/" + file;
            if (fs.lstatSync(curFrom).isDirectory()) { // recurse
                copyFolderRecursively(curFrom, curTo);
            } else {
                fs.copyFileSync(curFrom, curTo);
            }
        });
    }
};

const deleteFolderRecursive = function (path) {
    if (!path || path === '/' || path.substring(0, 2) === "..") {
        return;
    }
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

const deleteFolderContents = function (path) {
    if (!path || path === '/' || path.substring(0, 2) === "..") {
        return;
    }
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
    }
}




deleteFolderContents('./dist');
//TODO: Compile the partials individually so that users don't have to include the style for the whole library
//copyFolderRecursively('./src/styles', './dist/styles');

fs.mkdirSync('./dist/styles');

sass.render({
    file: './src/styles/index.scss',
    includePaths: ['./src/styles'],
    outputStyle: 'compressed',
    outFile: './dist/styles/axc-styles.css',
    sourceMap: true
}, function (error, result) { // node-style callback from v3.0.0 onwards
    if (error) {
        console.log('error while compiling sass files into css');
        throw error;
    }
    else {
        console.log('css built successfully, the compliation statistics follow: ');
        console.log(result.stats);
        console.log('proceeding to write compiled css to disk');
        fs.writeFile('./dist/styles/axc-styles.css', result.css, (error) => {
            if (error) {
                console.log('error while writing the results of sass compilation into the dist folder');
                throw error;
            }
        });
        //TODO: Create the css maps
    }
});


fs.copyFileSync('./package.json','./dist/package.json');
fs.copyFileSync('./LICENSE', './dist/LICENSE');
fs.copyFileSync('./README.md','./dist/README.md');
