const fs = require('fs');
const { promisify } = require('util');
const exec = require('child_process').exec;
copyFile = promisify(fs.copyFile);


const touch = (path)=>{
    fs.open(path, "wx", function (err, fd) {
        if(err){console.warn('error while opening file', err);}
        fs.close(fd, function (err) {
            if (err){
                throw err;
            }
        });
    });
}

touch('./docs/.nojekyll');

