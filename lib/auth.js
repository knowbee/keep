const fs = require("fs");
const os = require("os");

const { helper } = require("./help");
module.exports = {
  isLoggedIn: async () => {
    const credentials = fs.readFileSync(
      os.homedir + "/.bika/.credentials.json",
      "utf-8"
    );
    if (!credentials) helper();
    else {
      const { token } = await JSON.parse(credentials);
      return token;
    }
  }
};
