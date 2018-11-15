const fs = require('fs');
const { promisify } = require('util');
const exec = require('child_process').exec;
copyFile = promisify(fs.copyFile);

const releaseType = process.argv[2].split('=')[1];


exec(`npm version ${releaseType}`, async (err, str, stderr) => {
    if (!err) {
        const p = copyFile('./package.json', './dist/package.json');
        const p2 = copyFile('./LICENSE', './dist/LICENSE');
        const p3 = copyFile('./README.md', './dist/README.md');
        await p, p2,p3;
        exec('cd dist',(err)=>{
            if(!err){
                exec(`npm publish`);
            }
        });

    }
});

