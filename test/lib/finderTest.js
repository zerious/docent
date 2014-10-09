var fs = require('fs');
var mockFs = require('mock-fs');

describe('finder', function () {

  before(function () {
    is.function(mockFs);
    mockFs({
      'path/to/fake/dir': {
        'some-file.txt': 'file content here',
        'empty-dir': {/** empty directory */}
      },
      'path/to/some.png': new Buffer([8, 6, 7, 5, 3, 0, 9]),
      'some/other/path': {/** another empty directory */}
    });
  });

  after(function () {
    mockFs.restore();
  });

  it('recurses a directory', function () {
    fs.readdir('path/to/fake/dir', function (err, files) {
      is(files.length, 2);
    });
  });

  it('eventually succeeds', function (done) {
    is.fail();
    setTimeout(done, 1e3);
  });

});
