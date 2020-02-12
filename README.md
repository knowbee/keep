# Keep

    Your personal shell command keeper

## Why?

Keep solve the hustle of forgeting shell commands and having to always google/stackoverflow them wasting time

## Features

- Save a new command with a description
- Search the saved commands
- Use `keep --sync` and `keep --fetch` to sync the commands between your keep account and other computers.

**ProTip : Save the commands you usually forget in a database and sync it with your local machine.**

## Installation

```cli
npm install -g @knowbee/keep
```

or

```cli
yarn global add @knowbee/keep
```

## Usage

::

    Usage: keep [options]

      Keep helps you view and save shell commands

    Options:

      -V, --version  output the version number
      --register     create new keep account
      --login        login into your account
      --logout       logout from your account
      --new          keep a new command
      --fetch        fetch commands from database
      --list         list saved commands with description
      --search       search for a specific command
      --sync         sync your account with local storage
      -h, --help     output usage information

## Contribution

- Please before making a PR, read first this [Contributing Guideline](./CONTRIBUTING.md)

## License

MIT

## Author

Igwaneza Bruce
