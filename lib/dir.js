const fs = require("fs");
const os = require("os");
module.exports = {
  getCommandsDirectory: () => {
    return os.homedir() + "/.commands";
  },
  getCredentialsDirectory: () => {
    return os.homedir() + "/.keep";
  },
  directoryExists: filePath => {
    return fs.existsSync(filePath);
  }
};
