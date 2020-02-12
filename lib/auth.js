const fs = require("fs");
const os = require("os");

module.exports = {
  isLoggedIn: () => {
    try {
      const credentials = fs.readFileSync(
        os.homedir + "/.keep/.credentials.json",
        "utf-8"
      );
      if (credentials !== "undefined") {
        const { token } = JSON.parse(credentials);
        return token;
      }
    } catch (error) {
      if (error.code !== "ENOENT") {
        console.log(error);
      }
    }
  }
};
