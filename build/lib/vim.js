(function() {
  var child_process, editor, vim_open, _, _ref, _ref1, _ref2;

  _ = require('wegweg')({
    globals: true,
    shelljs: true
  });

  child_process = require('child_process');

  editor = (_ref = (_ref1 = (_ref2 = process.env.EDITOR) != null ? _ref2 : which('vim')) != null ? _ref1 : which('vi')) != null ? _ref : which('nano');

  module.exports = vim_open = function(cb) {
    var child, tmpfile;
    child = child_process.spawn(editor, [tmpfile = '/tmp/' + _.uuid()], {
      stdio: 'inherit'
    });
    return child.on('exit', function(e, code) {
      var bulk;
      if (e) {
        return cb(e);
      }
      try {
        bulk = _.reads(tmpfile).trim();
        return cb(null, bulk);
      } catch (_error) {
        e = _error;
        return cb(e);
      }
    });
  };

}).call(this);
