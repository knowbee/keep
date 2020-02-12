const cli = require("commander");
const keep = new cli.Command();
module.exports = {
  helper: () => {
    keep
      .name("keep")
      .version("0.0.1")
      .option("register, --register", "create new keep account")
      .option("login, --login", "login into your account")
      .option("logout, --logout", "logout from your account")
      .option("fetch, --fetch", "fetch commands from database")
      .option("new, --n", "create new commands")
      .option("list, --l", "list saved commands with description")
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
