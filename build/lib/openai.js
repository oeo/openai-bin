(function() {
  var API_KEY, e, iced, log, openai, p, r, request, __iced_deferrals, __iced_k, __iced_k_noop,
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

  request = require('request');

  API_KEY = process.env.OPENAI_API_KEY;

  module.exports = openai = {};


  /*
  curl https://api.openai.com/v1/chat/completions \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
      "model": "gpt-4",
      "messages": [{"role": "user", "content": "Hello!"}]
    }'
   */

  openai.query = function(opt, cb) {
    var url, _ref;
    url = "https://api.openai.com/v1/chat/completions";
    return request.post({
      url: url,
      headers: {
        Authorization: "Bearer " + API_KEY
      },
      json: {
        model: 'gpt-4-1106-preview',
        messages: [
          {
            role: "user",
            content: opt.prompt
          }
        ],
        max_tokens: (_ref = opt.tokens) != null ? _ref : void 0
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
    p = "I want you to generate a Jekyll-compatible seo friendly markdown article that is SEO optimized using the rules I provide below. Here is the format that Jekyll accepts:\n\n```markdown\n---\nlayout: post\ntitle:  \"This Should Be The Title\"\ndescription: \"This should be an SEO Description\"\ncategories: [seo, keywords, etc] \n---\n\nThis is the markdown content for the HTML of the page.\n\n```\n\nHere are the rules:\n\n- You do not need to use H1 tags, please begin by using H2 tags (##) because the H1 tags will be automatically generated. \n- If you decide to do a top list, only do top 5.\n- Generate the entire post.\n- Make liberal use of H2, H3 and potentially even H4 tags instead of overly using lists.\n- Make the tonality of the article informative while avoiding being overly structured, and make the reading level roughly 8th grade.\n- Use informal language that is casual.\n- Look up the title for the page from the sitemap I gave above, if none is provided then you may create one.\n- Never begin with \"Introduction\" and never end with \"Conclusion\".\n\nThe keyword for generation is \"Best Bone Broth Powders\". ";
    (function(_this) {
      return (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          filename: "/Users/taky/www/openai-bin/src/lib/openai.iced"
        });
        openai.query({
          prompt: p
        }, __iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              e = arguments[0];
              return r = arguments[1];
            };
          })(),
          lineno: 68
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
