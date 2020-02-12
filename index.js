#!/usr/bin/env node
const {
  getCommandsDirectory,
  getCredentialsDirectory,
  directoryExists
} = require("./lib/dir");
const { askCommands, askCredentials } = require("./lib/cli");
const { login, listcommand, newcommand, register } = require("./lib/api");
const { helper } = require("./lib/help");
const fs = require("fs");
const columnify = require("columnify");
const log = require("chalk");
const os = require("os");
const clear = require("clear");
const figlet = require("figlet");
const hide = require("fswin");
const rimraf = require("rimraf");
const { isLoggedIn } = require("./lib/auth");

clear();
console.log(log.magenta(figlet.textSync("keep", { horizontalLayout: "full" })));
const getcommands = () => {
  let cmds = fs.readFileSync(os.homedir() + "/.commands/cmd.json", "utf-8");
  if (!cmds) return [];
  else {
    const file = JSON.parse(cmds);
    return file;
  }
};

if (
  directoryExists(getCommandsDirectory()) &&
  directoryExists(getCredentialsDirectory())
) {
  helper();
  process.argv.slice(2).forEach(function(cmd) {
    if (cmd === "register" || cmd === "--register") {
      askCredentials().then(credentials => {
        register(credentials);
      });
    }
    if (cmd === "login" || cmd === "--login") {
      askCredentials().then(credentials => {
        login(credentials).then(result => {
          fs.writeFileSync(
            os.homedir() + "/.keep/.credentials.json",
            JSON.stringify(result, null)
          );
        });
      });
    }
    if (cmd === "new" || cmd === "--n") {
      if (isLoggedIn()) {
        askCommands().then(answers => {
          let cmds = getcommands();
          newcommand(answers).then(result => {
            if (result.command) {
              cmds.push({
                command: result.command,
                description: result.description
              });
              fs.writeFileSync(
                os.homedir() + "/.commands/cmd.json",
                JSON.stringify(cmds, null)
              );
            } else {
              console.log(result.msg);
              process.exit(1);
            }
            console.log("command is saved");
          });
        });
      } else {
        askCommands().then(answers => {
          let cmds = getcommands();
          cmds.push(answers);
          fs.writeFileSync(
            os.homedir() + "/.commands/cmd.json",
            JSON.stringify(cmds, null)
          );
          console.log("command is saved locally");
        });
      }
    }
    if (cmd === "fetch" || cmd === "--fetch") {
      let data = [];
      listcommand().then(result => {
        try {
          const { commands } = result;
          commands.forEach(cmd => {
            data.push({ command: cmd.command, description: cmd.description });
          });
          fs.writeFileSync(
            os.homedir() + "/.commands/cmd.json",
            JSON.stringify(data, null)
          );
          console.log(log.yellow("fetching done"));
        } catch (error) {
          console.log("check your internet");
        }
      });
    }
    if (cmd === "sync" || cmd === "--sync") {
      let data = getcommands();
      if (data.length > 0) {
        data.forEach(d => {
          newcommand(d).then(result => {
            try {
              data.push({
                command: result.command,
                description: result.description
              });
            } catch (error) {
              console.log("check your internet");
            }
          });
          console.log(log.yellow("fetching done"));
        });
      } else {
        console.log("your local commands store is empty!");
      }
    }
    if (cmd === "logout" || cmd === "--logout") {
      rimraf(getCommandsDirectory(), function() {
        console.log("commands removed");
      });
      rimraf(getCredentialsDirectory(), function() {
        console.log("logged out!");
      });
    }
    if (cmd === "list" || cmd === "--l") {
      console.log("\n");
      const cmds = getcommands();
      if (cmds.length > 0) {
        const columns = columnify(cmds);
        console.log(log.yellow(columns));
      } else {
        console.log(log.yellow("no commands saved"));
      }
    }
    if (cmd === "search" || cmd === "--s") {
      console.log("\n");
      const cmds = getcommands();
      const query = process.argv[3];
      let match = [];
      for (let i = 0; i < cmds.length; i++) {
        const command = cmds[i].command;
        const description = cmds[i].description;

        if (
          query === command ||
          command.includes(query) ||
          description.includes(query)
        ) {
          match.push({ command, description });
        }
      }
      const columns = columnify(match);
      console.log(log.yellow(columns));
    }
  });
} else {
  if (!directoryExists(getCommandsDirectory())) {
    let cmd = [];
    fs.mkdirSync(os.homedir() + "/.commands");
    hide.setAttributesSync(os.homedir() + "/.commands", { IS_HIDDEN: true });
    fs.writeFile(
      os.homedir() + "/.commands/cmd.json",
      JSON.stringify(cmd),
      { flag: "wx" },
      err => {
        if (err) throw err;
        console.log("keep initialized!");
      }
    );
  }
  if (directoryExists(getCredentialsDirectory()) === false) {
    fs.mkdirSync(os.homedir() + "/.keep/");
    hide.setAttributesSync(os.homedir() + "/.keep", { IS_HIDDEN: true });
  }
}
