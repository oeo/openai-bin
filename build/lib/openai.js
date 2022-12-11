(function() {
  var API_KEY, e, iced, openai, r, request, __iced_deferrals, __iced_k, __iced_k_noop,
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

  request = require('request');

  API_KEY = process.env.OPENAI_API_KEY;

  module.exports = openai = {};

  openai.query = function(opt, cb) {
    var url, _ref;
    url = "https://api.openai.com/v1/engines/text-davinci-003/completions";
    return request.post({
      url: url,
      headers: {
        Authorization: "Bearer " + API_KEY
      },
      json: {
        prompt: opt.prompt,
        max_tokens: (_ref = opt.tokens) != null ? _ref : 4000
      }
    }, function(err, response, body) {
      if (err) {
        return cb(err);
      } else {
        return cb(null, body);
      }
    });
  };

  if (!module.parent) {
    (function(_this) {
      return (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          filename: "/home/taky/www/openai-scripts/src/lib/openai.iced"
        });
        openai.query({
          query: 'Write a short poem about a girl named Ange'
        }, __iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              e = arguments[0];
              return r = arguments[1];
            };
          })(),
          lineno: 23
        }));
        __iced_deferrals._fulfill();
      });
    })(this)((function(_this) {
      return function() {
        console.log(e);
        return __iced_k(console.log(r));
      };
    })(this));
  } else {
    __iced_k();
  }

}).call(this);
