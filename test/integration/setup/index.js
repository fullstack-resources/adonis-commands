'use strict'

/**
 * adonis-commands
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const fold = require('adonis-fold')
const Ace = require('adonis-ace')
const path = require('path')
const fs = require('co-fs-extra')
const Helpers = {
  migrationsPath: function (file) {
    return path.join(__dirname, '../app/migrations/', file)
  },
  appPath: function () {
    return path.join(__dirname, '../app')
  }
}
class Schema {}
class Lucid {}

const setup = exports = module.exports = {}

setup.start = function * () {
  yield fs.emptyDir(path.join(__dirname, '../app'))
}

setup.end = setup.start

setup.registerProviders = () => {
  fold.Ioc.bind('Adonis/Src/Helpers', function () {
    return Helpers
  })
  fold.Ioc.bind('Schema', function () {
    return Schema
  })
  fold.Ioc.bind('Lucid', function () {
    return Lucid
  })
  return fold.Registrar.register(['adonis-ace/providers/CommandProvider', path.join(__dirname, '../../../providers/GeneratorsProvider')])
}

setup.registerCommands = () => {
  Ace.register(['Adonis/Commands/Make:Controller', 'Adonis/Commands/Make:Migration', 'Adonis/Commands/Make:Model'])
}

setup.invokeCommand = (command, args, options) => {
  return Ace.call(command, args, options)
}