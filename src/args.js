const yargs = require('yargs')

module.exports = (argv) => yargs
  .scriptName('decent')
  .usage('$0 [args]')
  .option('username', {
    type: 'string',
    default: '',
    describe: 'only show tweets for given username'
  })
  .option('max', {
    type: 'number',
    default: 20,
    describe: 'max number of tweets to show'
  })
  .option('reverse', {
    type: 'boolean',
    default: false,
    describe: 'reverse the timeline (useful for piping and reading with `less`)'
  })
  .help()
  .parse(argv)
