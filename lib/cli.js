const inquirer = require("inquirer");

module.exports = {
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
  authenticate: () => {
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
        name: "password",
        message: "Enter your password: ",
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return "Your command is empty";
          }
        }
      },
      {
        name: "token",
        message: "paste token here: ",
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
