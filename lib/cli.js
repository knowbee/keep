const inquirer = require('inquirer');

module.exports = {
  alert: () => {
    const questions = [
      {
        type: 'confirm',
        name: 'logout',
        message:
          'you might lose your unsynced commands. do you wish to continue? ',
        validate(value) {
          if (value.length) {
            return true;
          }
          return 'yes or no';
        }
      }
    ];
    return inquirer.prompt(questions);
  },
  init: () => {
    const questions = [
      {
        type: 'confirm',
        name: 'commands',
        message: 'Initialize keep first',
        validate(value) {
          if (value.length) {
            return true;
          }
          return 'yes or no';
        }
      }
    ];
    return inquirer.prompt(questions);
  },
  askCredentials: () => {
    const questions = [
      {
        name: 'email',
        message: 'Enter your email: ',
        validate(value) {
          if (value.length) {
            return true;
          }
          return 'Your email is empty';
        }
      },
      {
        type: 'password',
        name: 'password',
        message: 'Enter your password: ',
        validate(value) {
          if (value.length) {
            return true;
          }
          return 'Your command is empty';
        }
      }
    ];
    return inquirer.prompt(questions);
  },
  askCommands: () => {
    const questions = [
      {
        name: 'command',
        message: 'Type in your command: ',
        validate(value) {
          if (value.length) {
            return true;
          }
          return 'Your command is empty';
        }
      },
      {
        name: 'description',
        message: 'What does this command do?: ',
        validate(value) {
          if (value.length) {
            return true;
          }
          return 'Your command is empty';
        }
      }
    ];
    return inquirer.prompt(questions);
  }
};
