#!/usr/bin/env node

require('yargs')
  .version()
  .usage('Usage: decent <command> [options]')
  .command('init', 'Init ~/.decent/usernames', require('./commands/init'))
  .example('decent init', 'Initialize ~/.decent/usernames')
  .command(['list', '$0'], 'List timeline', require('./commands/list'))
  .example('decent list', 'List your timeline based on ~/.decent/usernames')
  .example('decent list --max 100', 'Show max 100 tweets')
  .command('filter <term>', 'Filter tweets based on search term', require('./commands/filter'))
  .example('decent filter erlang', 'Filter tweets containing term "erlang"')
  .command('follow <username>', 'Follow user', require('./commands/follow'))
  .example('decent follow lexfridman', 'Follow user "lexfridman"')
  // .demandCommand(1, 'You need at least one command before moving on')
  .help('h')
  .alias('h', 'help')
  .epilogue('for more information, find the documentation at https://decent.social/cli/')
  .argv
