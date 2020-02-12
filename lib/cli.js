const inquirer = require("inquirer");

module.exports = {
  init: () => {
    const questions = [
      {
        type: "confirm",
        name: "commands",
        message: "Initialize keep first",
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return "yes or no";
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
  askCredentials: () => {
    const questions = [
      {
        name: "email",
        message: "Enter your email: ",
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return "Your email is empty";
          }
        }
      },
      {
        type: "password",
        name: "password",
        message: "Enter your password: ",
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return "Your command is empty";
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
  askCommands: () => {
    const questions = [
      {
        name: "command",
        message: "Type in your command: ",
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return "Your command is empty";
          }
        }
      },
      {
        name: "description",
        message: "What does this command do?: ",
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return "Your command is empty";
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  }
};
