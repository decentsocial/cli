> Decent is an ad-free, privacy-first Twitter reading experience

Visit [decent.social](https://decent.social/)

<video autoplay loop src="https://decent.social/img/decent.social.cli.mp4"></video>

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
decent --max 50 --reverse | less
```