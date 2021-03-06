/**
 * Usage:
 *   docent rtl [options]
 *
 * Options:
 *   -p, --path         Path to traverse [.]
 */

var fs = require('fs');
var finder = require('../lib/finder');

module.exports = {

  description: 'Generate docent blocks in Ltl files',

  options: [
    '-p, --path     Path to traverse'
  ],

  run: function (options) {
    var path = (options.path || process.cwd()).replace(/\/$/, '');
    finder.findPairs(path, function (e, pairs) {
      pairs.forEach(grab);
    });

    function grab(pair) {
      var content = [];
      pair.forEach(function (path, index) {
        try {
          content[index] = '' + fs.readFileSync(path);
        }
        catch (e) {}
      });
      var md = content[0];
      var ltl = content[1];
      if (md && ltl) {
        var ltlPath = pair[1];
        // Escape ltl interpolation sequences.
        md = md.replace(/([&=$]\{[^\}]+\})/g, '\\\\$1');
        // Remove the first paragraph.
        md = md.replace(/^[\s\S]*?\n\n/, '');
        // Find the docent position inside the ltl page.
        var pattern = /([\s]+)\/\/\+docent[\s\S]*\/\/-docent/;
        var old = ltl;
        ltl = ltl.replace(pattern, function (match, indent) {
          md = ':marked\n' + indent + '  ' + md.replace(/\n/g, indent + '  ');
          return indent + '//+docent\n' + indent + md + '\n' + indent + '//-docent';
        });
        if (ltl != old) {
          fs.writeFileSync(ltlPath, ltl);
          console.info('Wrote content to "' + ltlPath.substr(path.length) + '".');
        }
      }
    }
  }

};
