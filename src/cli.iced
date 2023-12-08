# vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2
log = (x...) -> try console.log x...

_ = require('wegweg')({
  globals: on
  shelljs: on
})

YAML = require 'yaml'
env_vars = YAML.parse(_.reads __dirname + '/../env.yml')
process.env[k] ?= v for k,v of env_vars

openai = require './module'
vim = require './lib/vim'

stdin = ''

prog = (require 'commander').program

prog
  .name 'ai'
  .description 'cli wrapper for openai'

prog
  .argument 'prompt', {isDefault:yes}
  .summary 'query openai with prompt'
  .option '-t --tokens <int>', 'number of tokens to use', undefined
  .option '-m --model <model>', 'model to use (examples: gpt3.5-turbo, gpt-4, gpt-4-0613, gpt-3.5-turbo-16k-0613)', 'gpt3.5-turbo'
  .option '-r --raw'
  .action (prompt,options) ->
    if stdin
      prompt = stdin.trim()

    if _.type(prompt) is 'array'
      prompt = prompt.join(' ')
      prompt = prompt.trim()

    if !prompt
      await vim defer e,prompt
      if e then throw e

    if !prompt
      throw new Error 'prompt_noexists'

    await openai.query {
      prompt: prompt
      tokens: options.tokens
      model: options.model
      raw: options.raw
    }, defer e,r
    if e then throw e

    log r
    exit 0

##
if process.stdin.isTTY
  prog.parse()
else
  process.stdin.on 'readable', ->
    if (chunk = @read())
      stdin += chunk

  process.stdin.on 'end', ->
    process.argv.push stdin
    prog.parse()

