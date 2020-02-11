#!/usr/bin/env node
const { getCommandsDirectory, directoryExists } = require("./lib/dir");
const { askCommands } = require("./lib/cli");
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

if (directoryExists(getCommandsDirectory())) {
  helper();
  process.argv.slice(2).forEach(function(cmd) {
    if (cmd === "new" || cmd === "--n") {
      askCommands().then(answers => {
        const cmds = getcommands();
        cmds.push(answers);
        fs.writeFileSync(
          os.homedir() + "/.commands/cmd.json",
          JSON.stringify(cmds, null)
        );
      });
    }
    if (cmd === "list" || cmd === "--l") {
      console.log("\n");
      const cmds = getcommands();
      const columns = columnify(cmds);
      console.log(log.yellow(columns));
    }
  });
} else {
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
