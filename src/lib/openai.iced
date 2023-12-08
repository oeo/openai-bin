{log} = console
request = require 'request'

API_KEY = process.env.OPENAI_API_KEY

module.exports = openai = {}

###
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-4",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'

###

openai.query = (opt,cb) ->
  url = "https://api.openai.com/v1/chat/completions"
  
  request.post
    url: url
    headers:
      Authorization: "Bearer #{API_KEY}"
    json:
      model: opt.model ? "gpt-3.5-turbo"
      #model: 'gpt-4-1106-preview'
      messages: [{
        role: "user"
        content: opt.prompt
      }]
      max_tokens: opt.tokens ? undefined
    , (err, response, body) ->
      if err
        cb err
      else
        cb null, body

if !module.parent
  p = """
	I want you to generate a Jekyll-compatible seo friendly markdown article that is SEO optimized using the rules I provide below. Here is the format that Jekyll accepts:

	```markdown
	---
	layout: post
	title:  "This Should Be The Title"
	description: "This should be an SEO Description"
	categories: [seo, keywords, etc] 
	---

	This is the markdown content for the HTML of the page.

	```

	Here are the rules:

	- You do not need to use H1 tags, please begin by using H2 tags (##) because the H1 tags will be automatically generated. 
	- If you decide to do a top list, only do top 5.
	- Generate the entire post.
	- Make liberal use of H2, H3 and potentially even H4 tags instead of overly using lists.
	- Make the tonality of the article informative while avoiding being overly structured, and make the reading level roughly 8th grade.
	- Use informal language that is casual.
	- Look up the title for the page from the sitemap I gave above, if none is provided then you may create one.
	- Never begin with "Introduction" and never end with "Conclusion".

	The keyword for generation is "Best Bone Broth Powders". 
  """
  await openai.query {prompt:p}, defer e,r
  console.log e
  console.log r

