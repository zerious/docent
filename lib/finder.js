var finder = module.exports = {

  // TODO @louis: Recurse the path, finding "*/README.md"s matching "*.ltl"s.
  // TODO @dan: Determine your non-Lighter.io use-case so we can generalize.
  findPairs: function (path, fn) {
    // Assume we're running in Lighter.io.
    var projects = ['aloha', 'beams', 'cedar', 'chug', 'd6', 'exam',
      'gold', 'jymin', 'lighter', 'ltl', 'ormy', 'plans', 'requiry',
      'ringer', 'seattle', 'shellify', 'shoestring', 'sly', 'splode',
      'thrust', 'wedit', 'za', 'zeriousify'];
    var pairs = [];
    projects.forEach(function (name) {
      pairs.push([
        '/Users/sam/Workspace/' + name + '/README.md',
        path + '/views/' + name + '.ltl'
      ]);
    });
    fn(null, pairs);
  }

};
