/**
  * Script to replace app name
  */
'use strict';

const fs = require('fs');
const path = require('path');
const async = require('async');

const BASE = path.resolve(__dirname, '../');
const FILES = [
  {
    dir: 'package.json'
  },
  // client side
  {
    dir: 'client/app/app.js',
    isCamelCase: true
  },
  {
    dir: 'client/app/containers/home/index.js',
    isCamelCase: true
  },
  {
    dir: 'client/app/containers/thing/index.js',
    isCamelCase: true
  },

  // server side
  {
    dir: 'server/app.js',
    isCamelCase: true
  },
  {
    dir: 'server/config/express.js',
    isCamelCase: true
  },
  {
    dir: 'server/config/environment/development.js'
  },
  {
    dir: 'server/config/environment/production.js'
  }
];


function replaceString(filePath, oldString, newString, cb) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) { return cb(err); }

    let result = data.replace(oldString, newString);

    fs.writeFile(filePath, result, 'utf8', err => {
      if (err) { return cb(err); }
      cb();
    });
  });
}

function snakeToCamel(s){
  return s.replace(/(\-\w)/g, m => {
    return m[1].toUpperCase();
  });
}

function run(newStringSnakeCase) {
  let newStringCamelCase = snakeToCamel(newStringSnakeCase);

  async.map(FILES, (file, cb) => {
    let filePath = path.join(BASE, file.dir);
    let oldString = file.isCamelCase ? 'myMeanApp' : 'my-mean-app';
    let newString = file.isCamelCase ? newStringCamelCase : newStringSnakeCase ;

    console.log(`-- Processing file : ${file.dir}`);
    console.log(`${oldString} - ${newString}`);

    replaceString(filePath, oldString, newString, cb);
  }, err => {
    if (err) {
      console.error(err);
    }

    process.exit(0);
  });
}


if (process.argv.length < 3) {
  console.log('Invalid command');
  console.log('Example: npm run rename your-app-name');
  process.exit(0);
}

run(process.argv[2]);
