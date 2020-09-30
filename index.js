#!/usr/bin/env node

require('yargs')
  .version()
  .usage('Usage: decent <command> [options]')
  .command(['list [dir]', '$0'], 'List timeline', require('./commands/list'))
  .command('init', 'Init ~/.decent/usernames', require('./commands/init'))
  .example('decent list', 'List your timeline based on ~/.decent/usernames')
  .example('decent list --max 100', 'Show max 100 tweets')
  // .demandCommand(1, 'You need at least one command before moving on')
  .help('h')
  .alias('h', 'help')
  .epilogue('for more information, find the documentation at https://decent.social/cli/')
  .argv
