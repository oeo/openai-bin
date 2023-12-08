(function() {
  var YAML, e, env_vars, iced, k, lib, log, openai, r, v, _, __iced_deferrals, __iced_k, __iced_k_noop, _base,
    __slice = [].slice;

  iced = {
    Deferrals: (function() {
      function _Class(_arg) {
        this.continuation = _arg;
        this.count = 1;
        this.ret = null;
      }

      _Class.prototype._fulfill = function() {
        if (!--this.count) {
          return this.continuation(this.ret);
        }
      };

      _Class.prototype.defer = function(defer_params) {
        ++this.count;
        return (function(_this) {
          return function() {
            var inner_params, _ref;
            inner_params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            if (defer_params != null) {
              if ((_ref = defer_params.assign_fn) != null) {
                _ref.apply(null, inner_params);
              }
            }
            return _this._fulfill();
          };
        })(this);
      };

      return _Class;

    })(),
    findDeferral: function() {
      return null;
    },
    trampoline: function(_fn) {
      return _fn();
    }
  };
  __iced_k = __iced_k_noop = function() {};

  log = console.log;

  _ = require('wegweg')({
    globals: false,
    shelljs: false
  });

  YAML = require('yaml');

  env_vars = YAML.parse(_.reads(__dirname + '/../env.yml'));

  for (k in env_vars) {
    v = env_vars[k];
    if ((_base = process.env)[k] == null) {
      _base[k] = v;
    }
  }

  openai = require('./lib/openai');

  module.exports = lib = {};

  lib.query = function(opt, cb) {
    var e, r, ___iced_passed_deferral, __iced_deferrals, __iced_k;
    __iced_k = __iced_k_noop;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    log(/opt/, opt);
    (function(_this) {
      return (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: "/Users/taky/www/openai-bin/src/module.iced",
          funcname: "query"
        });
        openai.query(opt, __iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              e = arguments[0];
              return r = arguments[1];
            };
          })(),
          lineno: 18
        }));
        __iced_deferrals._fulfill();
      });
    })(this)((function(_this) {
      return function() {
        if (e) {
          return cb(e);
        }
        if (opt.raw) {
          return cb(null, r);
        }
        if (r.error) {
          return cb(new Error(r.error.message));
        }
        return cb(null, _.first(r.choices).message.content.trim());
      };
    })(this));
  };

  if (!module.parent) {
    log(/DEVEL/);
    (function(_this) {
      return (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          filename: "/Users/taky/www/openai-bin/src/module.iced"
        });
        lib.query({
          prompt: 'write something nice about ange, she\'s a sweet girl who doesn\'t need friends but needs encouragement',
          tokens: 500
        }, __iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              e = arguments[0];
              return r = arguments[1];
            };
          })(),
          lineno: 31
        }));
        __iced_deferrals._fulfill();
      });
    })(this)((function(_this) {
      return function() {
        log(e);
        log(r);
        return __iced_k(process.exit(0));
      };
    })(this));
  } else {
    __iced_k();
  }

}).call(this);
