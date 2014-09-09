#!/usr/bin/env node

// When running directly, start the CLI.
if (process.mainModule == module) {

  var shellify = require('shellify');
  shellify({
    commands: {
      gen: {
        note: 'Writes */README.md contents to *.ltl files',
        options: {
          //path: 'The path to traverse [.]'
        }
      }
    }
  });

}


var docent = module.exports;

/**
 * Expose the version to module users.
 */
docent.version = require('./package.json').version;
