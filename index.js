#!/usr/bin/env node
const {
  getCommandsDirectory,
  getCredentialsDirectory,
  directoryExists
} = require("./lib/dir");
const { askCommands, askCredentials, init } = require("./lib/cli");
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
const ora = require("ora");
const spinner = ora();
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
    if (cmd === "--register" || cmd === "r") {
      askCredentials().then(credentials => {
        register(credentials);
      });
    }
    if (cmd === "--login" || cmd === "l") {
      askCredentials().then(credentials => {
        login(credentials).then(result => {
          fs.writeFileSync(
            os.homedir() + "/.keep/.credentials.json",
            JSON.stringify(result, null)
          );
        });
      });
    }
    if (cmd === "--new" || cmd === "n") {
      if (isLoggedIn()) {
        require("dns").resolve("www.google.com", err => {
          if (err) {
            console.log("\n");
            console.log(log.red("[offline]"));
            keepOffline();
          } else {
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
                spinner.succeed(log.red("command is saved"));
                spinner.stop();
              });
            });
          }
        });
      } else {
        keepOffline();
      }
    }
    if (cmd === "--fetch" || cmd === "f") {
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
          process.exit(1);
        } catch (error) {
          spinner.fail(log.green("check your internet"));
          spinner.stop();
          process.exit(1);
        }
      });
    }
    if (cmd === "--sync" || cmd === "s") {
      spinner.start("syncing with local machine with keep account..");
      let data = getcommands();
      if (data.length > 0) {
        try {
          data.forEach(d => {
            newcommand(d);
          });
          spinner.succeed(log.green("sync is done"));
          spinner.stop();
        } catch (error) {
          spinner.succeed(log.red("check your internet"));
          spinner.stop();
          process.exit(1);
        }
      } else {
        spinner.succeed(log.red("your local commands store is empty!"));
        spinner.stop();
        process.exit(1);
      }
    }
    if (cmd === "--logout" || cmd === "lo") {
      spinner.start("removing local storage..");
      rimraf(getCommandsDirectory(), function() {
        spinner.succeed(log.green("commands removed"));
        spinner.stop();
      });
      rimraf(getCredentialsDirectory(), function() {
        spinner.succeed(log.green("credentials removed"));
        spinner.stop();
      });
    }
    if (cmd === "--list" || cmd === "li") {
      console.log("\n");
      const cmds = getcommands();
      if (cmds.length > 0) {
        const columns = columnify(cmds);
        console.log(log.green(columns));
      } else {
        spinner.succeed(log.green("no commands found"));
        spinner.stop();
      }
    }
    if (cmd === "--search" || cmd === "find") {
      spinner.start(log.green("searching..."));
      const cmds = getcommands();
      const query = process.argv[3];
      let match = [];
      for (let i = 0; i < cmds.length; i++) {
        const command = cmds[i].command;
        const description = cmds[i].description;

        if (command.includes(query) || description.includes(query)) {
          match.push({
            command,
            description
          });
        }
      }
      if (match.length > 0) {
        spinner.succeed(log.magenta("matches found"));
        spinner.stop();
        const columns = columnify(match);
        console.log(log.yellow(columns));
      } else {
        spinner.succeed(log.green("no matches found"));
        spinner.stop();
      }
    }
  });
} else {
  if (
    !directoryExists(getCommandsDirectory()) ||
    !directoryExists(getCredentialsDirectory())
  ) {
    init().then(choice => {
      const { commands } = choice;
      if (commands) {
        spinner.start(log.green("initializing..."));
        let cmd = [];
        fs.mkdirSync(os.homedir() + "/.commands");
        hide.setAttributesSync(os.homedir() + "/.commands", {
          IS_HIDDEN: true
        });
        fs.writeFile(
          os.homedir() + "/.commands/cmd.json",
          JSON.stringify(cmd),
          { flag: "wx" },
          err => {
            if (err) throw err;
            spinner.succeed(log.green("keep initialized"));
            spinner.stop();
          }
        );
        fs.mkdirSync(os.homedir() + "/.keep/");
        hide.setAttributesSync(os.homedir() + "/.keep", { IS_HIDDEN: true });
      } else {
        process.exit(1);
      }
    });
  }
}
function keepOffline() {
  askCommands().then(answers => {
    let cmds = getcommands();
    cmds.push(answers);
    fs.writeFileSync(
      os.homedir() + "/.commands/cmd.json",
      JSON.stringify(cmds, null)
    );
    spinner.succeed(log.green("command is saved locally"));
    spinner.stop();
  });
}
