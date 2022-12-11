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
  .argument '<prompt...>'
  .summary 'query openai divinci-003'
  .option '-t <int>', 'number of tokens to use', 1000
  .option '-r --raw'
  .showHelpAfterError()
  .action (prompt,options) ->
    if stdin
      prompt = stdin.trim()

    if _.type(prompt) is 'array'
      prompt = prompt.join(' ')

    if !prompt
      throw new Error 'prompt_noexists'

    await openai.query {
      prompt: prompt
      tokens: options.tokens
      raw: options.raw
    }, defer e,r
    if e then throw e

    log r
    exit 0

prog
  .command 'vim'
  .summary 'query openai divinci-003'
  .description 'opens editor for multi-line prompts'
  .option '-t <int>', 'number of tokens to use', 1000
  .option '-r --raw'
  .action (options) ->
    await vim defer e,prompt
    if e then throw e
    if !prompt then throw new Error 'prompt_null'
    await openai.query {
      prompt: prompt
      tokens: options.tokens
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

