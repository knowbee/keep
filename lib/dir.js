const fs = require('fs');
const os = require('os');

module.exports = {
  getCommandsDirectory: () => `${os.homedir()}/.commands`,
  getCredentialsDirectory: () => `${os.homedir()}/.keep`,
  directoryExists: (filePath) => fs.existsSync(filePath)
};
