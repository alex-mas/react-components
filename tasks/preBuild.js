//TODO: BOOTSTRAP STYLE FILES INTO THE APPROPIATE DIRECTORY TO BE IMPORTED BY USERS
const fs = require('fs');
const path = require('path');


const copyFolderRecursively = function (from, to) {
    if (fs.existsSync(from)) {
        if(!fs.existsSync(to)){
            fs.mkdirSync(to);
        }
        fs.readdirSync(from).forEach(function (file, index) {
            var curFrom = from + "/" + file;
            var curTo = to + "/" + file;
            if (fs.lstatSync(curFrom).isDirectory()) { // recurse
                copyFolderRecursively(curFrom, curTo);
            } else {
                fs.copyFileSync(curFrom,curTo);
            }
        });
    }
};

const deleteFolderRecursive = function(path) {
    if(!path || path === '/' || path.substring(0,2) === ".."){
      return;
    }
      if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file, index){
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

const deleteFolderContents = function(path){
    if(!path || path === '/' || path.substring(0,2) === ".."){
      return;
    }
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach(function(file, index){
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
copyFolderRecursively('./src/styles', './dist/styles');
