#!/usr/bin/env node
if (process.mainModule == module) {
  require('./common/process/cli')({
    aliases: {
      g: 'gen'
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
    return require(__dirname + '/package.json').version;
  }
});
