#!/usr/bin/env node

var pathwayOCR = require('./index.js');
var fs = require('fs');
var program = require('commander');

var npmPackage = JSON.parse(fs.readFileSync('./package.json', {encoding: 'utf8'}));

program
  .version(npmPackage.version);

program
  .command('ocr <filepath>')
  .description('OCR a pathway.')
  .action(function(filepath) {
    pathwayOCR.ocr(filepath, function(err, result) {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      process.stdout.write(JSON.stringify(result));
      process.exit(0);
    });
  });

program.parse(process.argv);

// can run from command line like this:
// node pathway-ocr.js ocr ./nchembio.500-F2.jpg
