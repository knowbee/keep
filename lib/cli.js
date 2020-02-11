const inquirer = require("inquirer");

module.exports = {
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
