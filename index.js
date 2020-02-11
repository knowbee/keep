#!/usr/bin/env node
const {
  getCommandsDirectory,
  getCredentialsDirectory,
  directoryExists
} = require("./lib/dir");
const { askCommands, askCredentials } = require("./lib/cli");
const { login, listcommand, newcommand, register } = require("./lib/api");
const { isLoggedIn } = require("./lib/auth");
const { helper } = require("./lib/help");
const fs = require("fs");
const columnify = require("columnify");
const log = require("chalk");
const os = require("os");
const clear = require("clear");
const figlet = require("figlet");
const hide = require("fswin");

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
      newcommand();
      // askCommands().then(answers => {
      //   const cmds = getcommands();
      //   cmds.push(answers);
      //   fs.writeFileSync(
      //     os.homedir() + "/.commands/cmd.json",
      //     JSON.stringify(cmds, null)
      //   );
      // });
    }
    if (cmd === "list" || cmd === "--l") {
      console.log("\n");
      const cmds = getcommands();
      const columns = columnify(cmds);
      console.log(log.yellow(columns));
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
