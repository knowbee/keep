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
      .version("0.0.1")
      .option("register", "create new keep account")
      .option("login", "login into your account")
      .option("logout", "logout from your account")
      .option("new", "create new commands")
      .option("fetch", "fetch commands from database")
      .option("list", "list saved commands with description")
      .option("search", "search for a specific command")
      .parse(process.argv);
    keep.on("--help", function() {
      console.log("How to use keep:");
      console.log("  $ keep --help");
      console.log("  $ keep --register");
      console.log("  $ keep --login");
      console.log("  $ keep new");
      console.log("  $ keep list");
    });
  }
};
