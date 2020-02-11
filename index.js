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

clear();
console.log(log.magenta(figlet.textSync("bika", { horizontalLayout: "full" })));
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
            os.homedir() + "/.bika/.credentials.json",
            JSON.stringify(result, null)
          );
        });
      });
    }
    if (cmd === "new" || cmd === "--n") {
      askCommands().then(answers => {
        let cmds = getcommands();
        newcommand(answers).then(result => {
          cmds.push({
            command: result.command,
            description: result.description
          });
          fs.writeFileSync(
            os.homedir() + "/.commands/cmd.json",
            JSON.stringify(cmds, null)
          );
        });
      });
    }
    if (cmd === "fetch" || cmd === "--fetch") {
      console.log("\n");
      let data = [];
      listcommand().then(result => {
        const { commands } = result;
        commands.forEach(cmd => {
          data.push({ command: cmd.command, description: cmd.description });
        });
        fs.writeFileSync(
          os.homedir() + "/.commands/cmd.json",
          JSON.stringify(data, null)
        );
      });
      console.log(log.yellow("fetching done"));
    }
    if (cmd === "logout" || cmd === "--logout") {
      rimraf(getCredentialsDirectory(), function() {
        console.log("done");
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
  });
} else {
  if (directoryExists(getCommandsDirectory()) === false) {
    let cmd = [];
    fs.mkdirSync(os.homedir() + "/.commands");
    hide.setAttributesSync(os.homedir() + "/.commands", { IS_HIDDEN: true });
    fs.writeFile(
      os.homedir() + "/.commands/cmd.json",
      JSON.stringify(cmd),
      { flag: "wx" },
      err => {
        if (err) throw err;
        console.log("bika initialized!");
      }
    );
  }
  if (directoryExists(getCredentialsDirectory()) === false) {
    fs.mkdirSync(os.homedir() + "/.bika/");
    hide.setAttributesSync(os.homedir() + "/.bika", { IS_HIDDEN: true });
  }
}
