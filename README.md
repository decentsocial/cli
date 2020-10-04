> Decent is an ad-free, privacy-first Twitter reading experience

Read your Twitter timeline in the terminal, using Nitter RSS feeds!

Public Nitter instance is available at [nitter.decent.social](https://nitter.decent.social)

---

Visit [decent.social](https://decent.social/)

[👀 See a demo](https://decent.social/cli/)

![github actions status](https://github.com/decentsocial/cli/workflows/decent-social-cli/badge.svg)

![license](https://img.shields.io/npm/l/decent-social-cli)

[![npm version](https://badge.fury.io/js/decent-social-cli.svg)](https://badge.fury.io/js/decent-social-cli)

# installation

```sh
npm i -g decent-social-cli

# or, for one-off run
npx decent-social-cli --help
```

# set up

initialize your timeline with your current user if you like.

this will fetch you current followers (currently max 100) and add them to `~/.decent/usernames`

```sh
decent init <username>

# example

decent init christian_fei
```

`~/.decent/usernames` looks like this

```
elonmusk
lexfridman
mkbhd
...
```

Read your timeline with `less`:

```sh
decent --max 100 | less
```

# commands

for more information, see `decent --help`

```sh
# Initialize ~/.decent/usernames
decent init

# List your timeline based on ~/.decent/usernames
decent list

# List the timeline of the user "lexfridman"
decent list lexfridman

# Show max 100 tweets
decent list --max 100

# Show max 100 tweets without retweets
decent list --no-retweets --max 100

# Show max 100 tweets without replies
decent list --no-replies --max 100

# Show max 100 tweets without replies without retweets
decent list --no-replies --no-retweets --max 100

# Filter tweets containing term "erlang"
decent filter erlang

# Follow user "lexfridman"
decent follow lexfridman

# unfollow user "lexfridman"
decent unfollow lexfridman

# Followers of user "lexfridman"
decent followers lexfridman
```
