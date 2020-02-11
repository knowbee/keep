const fs = require("fs");
const os = require("os");
module.exports = {
  getCommandsDirectory: () => {
    return os.homedir() + "/.commands";
  },
  getCredentialsDirectory: () => {
    return os.homedir() + "/.bika";
  },
  directoryExists: filePath => {
    return fs.existsSync(filePath);
  }
};
