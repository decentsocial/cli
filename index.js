#!/usr/bin/env node

if (require.main === module) {
  require('yargs')
    .version()
    .usage('Usage: decent <command> [options]')
    .command('init <username>', 'Init ~/.decent/usernames', require('./commands/init'))
    .example('decent init', 'Initialize ~/.decent/usernames')
    .command(['list', '$0'], 'List timeline', require('./commands/list'))
    .command('<username>', 'List the timeline of a user', require('./commands/list'))
    .command('list <username>', 'List the timeline of a user', require('./commands/list'))
    .command('list --no-retweet', 'List the timeline without retweets', require('./commands/list'))
    .command('list --no-replies', 'List the timeline without repliess', require('./commands/list'))
    .example('decent list', 'List your timeline based on ~/.decent/usernames')
    .example('decent list lexfridman', 'List the timeline of the user "lexfridman"')
    .example('decent list --max 100', 'Show max 100 tweets')
    .example('decent list --no-retweets --max 100', 'Show max 100 tweets without retweets')
    .example('decent list --no-replies --max 100', 'Show max 100 tweets without replies')
    .example('decent list --no-replies --no-retweets --max 100', 'Show max 100 tweets without replies without retweets')
    .command('filter <term>', 'Filter tweets based on search term', require('./commands/filter'))
    .example('decent filter erlang', 'Filter tweets containing term "erlang"')
    .command('follow <username>', 'Follow user', require('./commands/follow'))
    .example('decent follow lexfridman', 'Follow user "lexfridman"')
    .command('unfollow <username>', 'Unfollow user', require('./commands/unfollow'))
    .example('decent unfollow lexfridman', 'unfollow user "lexfridman"')
    .command('followers <username>', 'Followers of  user', require('./commands/followers'))
    .example('decent followers lexfridman', 'Followers of user "lexfridman"')
    // .demandCommand(1, 'You need at least one command before moving on')
    .help('h')
    .alias('h', 'help')
    .epilogue('for more information, find the documentation at https://decent.social/cli/')
    .argv
} else {
  module.exports = {
    init: require('./commands/init').init,
    list: require('./commands/list').list,
    filter: require('./commands/filter').filter,
    followers: require('./commands/followers').followers,
  }
}
