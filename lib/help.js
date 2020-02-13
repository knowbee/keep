const cli = require("commander");
const keep = new cli.Command();
module.exports = {
  helper: () => {
    keep
      .name("keep")
      .description(
        `Keep helps you view and save shell commands 
      `
      )
      .version("1.0.2")
      .option("--register, r", "create new keep account")
      .option("--login, l", "login into your account")
      .option("--logout, lo", "logout from your account")
      .option("--new, n", "create new commands")
      .option("--fetch, f", "fetch commands from database")
      .option("--list, li", "list saved commands with description")
      .option("--search, s", "search for a specific command")
      .option("--sync", "sync your account with local commands")
      .parse(process.argv);
    keep.on("--help", function() {
      console.log("How to use keep:");
      console.log("  $ keep --help");
      console.log("  $ keep --register");
      console.log("  $ keep --login");
      console.log("  $ keep --new");
      console.log("  $ keep --list");
    });
  }
};
