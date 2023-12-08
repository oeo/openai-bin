# vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2
{log} = console

_ = require('wegweg')({
  globals: no
  shelljs: no
})

YAML = require 'yaml'
env_vars = YAML.parse(_.reads __dirname + '/../env.yml')
process.env[k] ?= v for k,v of env_vars

openai = require './lib/openai'

module.exports = lib = {}

lib.query = (opt,cb) ->
  await openai.query opt, defer e,r
  if e then return cb e
  if opt.raw then return cb null, r
  if r.error
    return cb new Error(r.error.message)
  return cb null, _.first(r.choices).message.content.trim()

##
if !module.parent
  log /DEVEL/
  await lib.query {
    prompt: 'write something nice about ange, she\'s a sweet girl who doesn\'t need friends but needs encouragement'
    tokens: 500
  }, defer e,r
  log e
  log r
  process.exit 0

