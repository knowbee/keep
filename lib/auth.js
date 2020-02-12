const fs = require("fs");
const os = require("os");

const { helper } = require("./help");
module.exports = {
  isLoggedIn: () => {
    try {
      const credentials = fs.readFileSync(
        os.homedir + "/.bika/.credentials.json",
        "utf-8"
      );
      const { token } = JSON.parse(credentials);
      return token;
    } catch (error) {
      console.log("You are not logged in");
    }
  }
};
