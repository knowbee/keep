# Keep

[![Build Status](https://travis-ci.org/knowbee/keep.svg?branch=master)](https://travis-ci.org/knowbee/keep)
[![Npm Weekly Downloads](https://badgen.net/npm/dw/@knowbee/keep)](https://badgen.net/npm/dw/@knowbee/keep)
[![Dependency Status](https://david-dm.org/knowbee/keep.svg)](https://david-dm.org/knowbee/keep)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)
[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)

    Your personal shell command keeper

## Why?

Keep solves the hustle of forgeting shell commands and having to always google/stackoverflow them wasting your precious time 😉

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

      --version,  -V      output the version number
      --register,  r      create new keep account
      --login,     l      login into your account
      --logout ,   lo     logout from your account
      --new        n      keep a new command
      --fetch      f      fetch commands from database
      --list       li     list saved commands with description
      --search     s      search for a specific command
      --sync              sync your account with local storage
      -h, --help          output usage information

## Contribution

- Please before making a PR, read first this [Contributing Guideline](./CONTRIBUTING.md)

## License

MIT

## Author

Igwaneza Bruce
