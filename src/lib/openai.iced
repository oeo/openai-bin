request = require 'request'

API_KEY = process.env.OPENAI_API_KEY

module.exports = openai = {}

openai.query = (opt,cb) ->
  url = "https://api.openai.com/v1/engines/text-davinci-003/completions"
  
  request.post
    url: url
    headers:
      Authorization: "Bearer #{API_KEY}"
    json:
      prompt: opt.prompt
      max_tokens: opt.tokens ? 3000
    , (err, response, body) ->
      if err
        cb err
      else
        cb null, body

if !module.parent
  await openai.query {query:'Write a short poem about a girl named Ange'}, defer e,r
  console.log e
  console.log r

