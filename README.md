> Decent is an ad-free, privacy-first Twitter reading experience

Visit [decent.social](https://decent.social/)

[👀 See a demo](https://decent.social/cli)

Create `~/.decent/usernames` with the Twitter accounts you want to follow

E.g.

```
elonmusk
lexfridman
mkbhd
```

Then

```sh
npm i -g decent-social-cli

decent --help
```

Read with `less`:

```sh
decent --max 50 | less
```

for more information, see `decent --help`

# some examples

```sh
decent init', 'Initialize ~/.decent/usernames'

decent list', 'List your timeline based on ~/.decent/usernames'

decent list lexfridman', 'List the timeline of the user "lexfridman"'

decent list --max 100', 'Show max 100 tweets'

decent list --no-retweets --max 100', 'Show max 100 tweets without retweets'

decent list --no-replies --max 100', 'Show max 100 tweets without replies'

decent list --no-replies --no-retweets --max 100', 'Show max 100 tweets without replies without retweets'

decent filter erlang', 'Filter tweets containing term "erlang"'

decent follow lexfridman', 'Follow user "lexfridman"'

decent unfollow lexfridman', 'unfollow user "lexfridman"'

decent followers lexfridman', 'Followers of user "lexfridman"'
```
