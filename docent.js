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

/**
 * Set up Ltl with a custom configured Marked.
 */
var docent = module.exports = function () {
  var marked = require('ltl').filters.marked = require('marked');
  var highlight = require('highlight.js');
  var renderer = new marked.Renderer();

  renderer.heading = function (text, n) {
    var id = text.toLowerCase().replace(/[^\w]+/g, '-');
    return '<h' + n + ' id="' + id + '"><a name="' + id + '"></a>' +
      '<a href="#' + id + '" class="_ANCHOR"><i></i>' + text + '</a>' +
      '</h' + n + '>';
  };

  marked.setOptions({
    highlight: function (code) {
      return /\n/.test(code) ? highlight.highlightAuto(code).value : code;
    },
    renderer: renderer
  });

};

/**
 * Expose the Docent version via package.json lazy loading.
 */
Object.defineProperty(docent, 'version', {
  get: function () {
    return require('./package.json').version;
  }
});
