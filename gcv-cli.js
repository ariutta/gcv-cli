#!/usr/bin/env node

var gcv = require('./index.js');
var fs = require('fs');
var program = require('commander');

var npmPackage = JSON.parse(fs.readFileSync('./package.json', {encoding: 'utf8'}));

program
  .version(npmPackage.version);

program
  .command('* <filepath>')
  .description('OCR a pathway.')
  .action(function(filepath) {
    var type = 'TEXT_DETECTION';
    gcv(filepath, type)
    .pipe(process.stdout)
  });

program.parse(process.argv);
