#!/usr/bin/env node

const fs = require('fs');
const columnify = require('columnify');
const log = require('chalk');
const os = require('os');
const clear = require('clear');
const figlet = require('figlet');
const hide = require('fswin');
const rimraf = require('rimraf');
const ora = require('ora');
const ostype = require('check-os');
const {
  isLoggedIn
} = require('./lib/auth');
const {
  helper
} = require('./lib/help');
const {
  login,
  listcommand,
  newcommand,
  register
} = require('./lib/api');
const {
  askCommands,
  askCredentials,
  init,
  alert
} = require('./lib/cli');
const {
  getCommandsDirectory,
  getCredentialsDirectory,
  directoryExists
} = require('./lib/dir');

const spinner = ora();
clear();
console.log(
  log.magenta(
    figlet.textSync('keep', {
      horizontalLayout: 'full'
    })
  )
);
const getcommands = () => {
  const cmds = fs.readFileSync(`${os.homedir()}/.commands/cmd.json`, 'utf-8');
  if (!cmds) return [];

  const file = JSON.parse(cmds);
  return file;
};

if (
  directoryExists(getCommandsDirectory()) &&
  directoryExists(getCredentialsDirectory())
) {
  helper();
  process.argv.slice(2).forEach((cmd) => {
    if (cmd === '--register' || cmd === 'r') {
      askCredentials().then((credentials) => {
        register(credentials);
      });
    }
    if (cmd === '--login' || cmd === 'l') {
      askCredentials().then((credentials) => {
        login(credentials).then((result) => {
          fs.writeFileSync(
            `${os.homedir()}/.keep/.credentials.json`,
            JSON.stringify(result, null)
          );
        });
      });
    }
    if (cmd === '--new' || cmd === 'n') {
      if (isLoggedIn()) {
        require('dns').resolve('www.google.com', (err) => {
          if (err) {
            console.log('\n');
            console.log(log.red('[offline]'));
            keepOffline();
          } else {
            askCommands().then((answers) => {
              const cmds = getcommands();
              newcommand(answers).then((result) => {
                if (result.command) {
                  cmds.push({
                    command: result.command,
                    description: result.description
                  });
                  fs.writeFileSync(
                    `${os.homedir()}/.commands/cmd.json`,
                    JSON.stringify(cmds, null)
                  );
                } else {
                  console.log(result.msg);
                  process.exit(1);
                }
                spinner.succeed(log.red('command is saved'));
                spinner.stop();
              });
            });
          }
        });
      } else {
        keepOffline();
      }
    }
    if (cmd === '--fetch' || cmd === 'f') {
      const data = [];
      listcommand().then((result) => {
        try {
          const {
            commands
          } = result;
          commands.forEach((cmd) => {
            data.push({
              command: cmd.command,
              description: cmd.description
            });
          });
          fs.writeFileSync(
            `${os.homedir()}/.commands/cmd.json`,
            JSON.stringify(data, null)
          );
          process.exit(1);
        } catch (error) {
          spinner.fail(log.green('check your internet'));
          spinner.stop();
          process.exit(1);
        }
      });
    }
    if (cmd === '--sync') {
      spinner.start('syncing with local machine with keep account..');
      const data = getcommands();
      if (data.length > 0) {
        try {
          data.forEach((d) => {
            newcommand(d);
          });
          spinner.succeed(log.green('sync is done'));
          spinner.stop();
        } catch (error) {
          spinner.succeed(log.red('check your internet'));
          spinner.stop();
          process.exit(1);
        }
      } else {
        spinner.succeed(log.red('your local commands store is empty!'));
        spinner.stop();
        process.exit(1);
      }
    }
    if (cmd === '--logout' || cmd === 'lo') {
      alert().then((choice) => {
        const {
          logout
        } = choice;
        if (logout) {
          spinner.start('removing local storage..');
          rimraf(getCommandsDirectory(), () => {
            spinner.succeed(log.green('commands removed'));
            spinner.stop();
          });
          rimraf(getCredentialsDirectory(), () => {
            spinner.succeed(log.green('credentials removed'));
            spinner.stop();
          });
        } else {
          spinner.warn('safety first, run keep --sync before you logout');
          spinner.stop();
        }
      });
    }
    if (cmd === '--list' || cmd === 'li') {
      console.log('\n');
      const cmds = getcommands();
      if (cmds.length > 0) {
        const columns = columnify(cmds);
        console.log(log.green(columns));
      } else {
        spinner.succeed(log.green('no commands found'));
        spinner.stop();
      }
    }
    if (cmd === '--search' || cmd === 's') {
      spinner.start(log.green('searching...'));
      const cmds = getcommands();
      const query = process.argv[3];
      const match = [];
      for (let i = 0; i < cmds.length; i++) {
        const {
          command
        } = cmds[i];
        const {
          description
        } = cmds[i];

        if (command.includes(query) || description.includes(query)) {
          match.push({
            command,
            description
          });
        }
      }
      if (match.length > 0) {
        spinner.succeed(log.magenta('matches found'));
        spinner.stop();
        const columns = columnify(match);
        console.log(log.yellow(columns));
      } else {
        spinner.succeed(log.green('no matches found'));
        spinner.stop();
      }
    }
  });
} else if (
  !directoryExists(getCommandsDirectory()) ||
  !directoryExists(getCredentialsDirectory())
) {
  init().then((choice) => {
    const {
      commands
    } = choice;
    if (commands) {
      spinner.start(log.green('initializing...'));
      const cmd = [];
      try {
        fs.mkdirSync(`${os.homedir()}/.commands`);

      } catch (error) {
        console.log('commands initialized')
      }
      if (ostype.isWindows) {
        hide.setAttributesSync(`${os.homedir()}/.commands`, {
          IS_HIDDEN: true
        });
      }
      fs.writeFile(
        `${os.homedir()}/.commands/cmd.json`,
        JSON.stringify(cmd), {
          flag: 'wx'
        },
        (err) => {
          if (err) throw err;
          spinner.succeed(log.green('keep initialized'));
          spinner.stop();
        }
      );
      fs.mkdirSync(`${os.homedir()}/.keep/`);
      if (ostype.isWindows) {

        hide.setAttributesSync(`${os.homedir()}/.keep`, {
          IS_HIDDEN: true
        });
      }
    } else {
      process.exit(1);
    }
  });
}

function keepOffline() {
  askCommands().then((answers) => {
    const cmds = getcommands();
    cmds.push(answers);
    fs.writeFileSync(
      `${os.homedir()}/.commands/cmd.json`,
      JSON.stringify(cmds, null)
    );
    spinner.succeed(log.green('command is saved locally'));
    spinner.stop();
  });
}