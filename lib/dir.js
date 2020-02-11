const fs = require("fs");
const os = require("os");
module.exports = {
  getCommandsDirectory: () => {
    return os.homedir() + "/.commands";
  },

  directoryExists: filePath => {
    return fs.existsSync(filePath);
  }
};
