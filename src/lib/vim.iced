_ = require('wegweg')(globals:on,shelljs:on)

child_process = require('child_process')
editor = process.env.EDITOR ? which('vim') ? which('vi') ? which('nano')

module.exports = vim_open = (cb) ->
  child = child_process.spawn(editor, [tmpfile = '/tmp/' + _.uuid()], {
    stdio: 'inherit'
  })

  child.on 'exit', (e,code) ->
    if e then return cb e
    try
      bulk = _.reads(tmpfile).trim()
      return cb null, bulk
    catch e
      return cb e

