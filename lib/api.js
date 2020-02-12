const API_URL = "https://bika-api.herokuapp.com";
const fetch = require("node-fetch");
const { isLoggedIn } = require("./auth");
const ora = require("ora");
const spinner = ora();
const color = require("chalk");

module.exports = {
  register: async user => {
    try {
      const response = await fetch(`${API_URL}/api/v1/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(user)
      });
      const json = await response.json();
      if (response.ok) {
        console.log(json.msg);
        process.exit(1);
      } else {
        spinner.fail(color.red("invalid inputs"));
        spinner.stop();
        process.exit(1);
      }
    } catch (error) {
      spinner.fail(color.red("check your internet"));
      spinner.stop();
      process.exit(1);
    }
  },

  login: async credentials => {
    try {
      const token = await isLoggedIn();
      const response = await fetch(`${API_URL}/api/v1/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "access-token": credentials.token
        },
        body: JSON.stringify(credentials)
      });
      const json = await response.json();
      if (response.ok) {
        if (token || token === json.token) {
          spinner.succeed(color.magenta("Already logged in"));
          spinner.stop();
          process.exit();
        }
        spinner.succeed(color.green("Logged in successfully"));
        spinner.stop();
        return json;
      } else {
        spinner.fail(color.red("invalid credentials"));
        spinner.stop();
        process.exit(1);
      }
    } catch (error) {
      spinner.fail(color.red("check your internet"));
      spinner.stop();
      process.exit(1);
    }
  },
  newcommand: async data => {
    try {
      const token = await isLoggedIn();
      if (token) {
        const response = await fetch(`${API_URL}/api/v1/cmd`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "access-token": token
          },
          body: JSON.stringify(data)
        });
        const json = await response.json();
        if (response.ok) {
          return json;
        } else {
          spinner.fail(color.red("try again"));
          spinner.stop();
          process.exit(1);
        }
      } else {
        spinner.fail(color.red("you must log in"));
        spinner.stop();
        process.exit(1);
      }
    } catch (error) {
      spinner.fail(color.red("check your internet"));
      spinner.stop();
      process.exit(1);
    }
  },
  listcommand: async () => {
    try {
      const token = await isLoggedIn();
      if (token) {
        spinner.start("fetching commands from database...");
        const response = await fetch(`${API_URL}/api/v1/cmd`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            "access-token": token
          }
        });
        const json = await response.json();
        if (response.ok) {
          spinner.succeed(color.green("done"));
          spinner.stop();
          return json;
        } else {
          spinner.fail(color.red("check your internet"));
          spinner.stop();
          process.exit(1);
        }
      }
    } catch (error) {
      spinner.fail(color.red("check your internet"));
      spinner.stop();
      process.exit(1);
    }
  }
};
