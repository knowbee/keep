const cli = require("commander");
const bika = new cli.Command();
module.exports = {
  helper: () => {
    bika
      .name("bika")
      .version("0.0.1")
      .option("register, --register", "create new bika account")
      .option("login, --login", "login into your account")
      .option("new, --n", "create new commands")
      .option("list, --l", "list saved commands with description")
      .parse(process.argv);
    bika.on("--help", function() {
      console.log("How to use bika:");
      console.log("  $ bika --help");
      console.log("  $ bika --register");
      console.log("  $ bika --login");
      console.log("  $ bika new");
      console.log("  $ bika list");
    });
  }
};
