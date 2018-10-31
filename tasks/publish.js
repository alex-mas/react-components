const fs = require('fs');
const path = require('path');
const process = require('process');
const exec = require('child_process').exec;



fs.copyFileSync('./package.json','./dist/package.json');

process.chdir('dist');

var child = exec('npm publish',
  function(err, stdout, stderr) {
    if (err) throw err;
    else console.log(stdout);
});