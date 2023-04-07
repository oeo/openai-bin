(function() {
  var YAML, env_vars, iced, k, log, openai, prog, stdin, v, vim, _, __iced_k, __iced_k_noop, _base,
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

  log = function() {
    var x;
    x = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    try {
      return console.log.apply(console, x);
    } catch (_error) {}
  };

  _ = require('wegweg')({
    globals: true,
    shelljs: true
  });

  YAML = require('yaml');

  env_vars = YAML.parse(_.reads(__dirname + '/../env.yml'));

  for (k in env_vars) {
    v = env_vars[k];
    if ((_base = process.env)[k] == null) {
      _base[k] = v;
    }
  }

  openai = require('./module');

  vim = require('./lib/vim');

  stdin = '';

  prog = (require('commander')).program;

  prog.name('ai').description('cli wrapper for openai');

  prog.argument('[prompt...]', {
    isDefault: true
  }).summary('query openai gpt3.5 turbo').option('-t <int>', 'number of tokens to use', void 0).option('-r --raw').action(function(prompt, options) {
    var e, r, ___iced_passed_deferral, __iced_deferrals, __iced_k;
    __iced_k = __iced_k_noop;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    if (stdin) {
      prompt = stdin.trim();
    }
    if (_.type(prompt) === 'array') {
      prompt = prompt.join(' ');
      prompt = prompt.trim();
    }
    (function(_this) {
      return (function(__iced_k) {
        if (!prompt) {
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral,
              filename: "/Users/taky/www/openai-bin/src/cli.iced"
            });
            vim(__iced_deferrals.defer({
              assign_fn: (function() {
                return function() {
                  e = arguments[0];
                  return prompt = arguments[1];
                };
              })(),
              lineno: 37
            }));
            __iced_deferrals._fulfill();
          })(function() {
            if (e) {
              throw e;
            }
            return __iced_k();
          });
        } else {
          return __iced_k();
        }
      });
    })(this)((function(_this) {
      return function() {
        if (!prompt) {
          throw new Error('prompt_noexists');
        }
        (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "/Users/taky/www/openai-bin/src/cli.iced"
          });
          openai.query({
            prompt: prompt,
            tokens: options.tokens,
            raw: options.raw
          }, __iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                e = arguments[0];
                return r = arguments[1];
              };
            })(),
            lineno: 47
          }));
          __iced_deferrals._fulfill();
        })(function() {
          if (e) {
            throw e;
          }
          log(r);
          return exit(0);
        });
      };
    })(this));
  });

  if (process.stdin.isTTY) {
    prog.parse();
  } else {
    process.stdin.on('readable', function() {
      var chunk;
      if ((chunk = this.read())) {
        return stdin += chunk;
      }
    });
    process.stdin.on('end', function() {
      process.argv.push(stdin);
      return prog.parse();
    });
  }

}).call(this);
