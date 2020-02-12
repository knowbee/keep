const API_URL = "https://bika-api.herokuapp.com";
const fetch = require("node-fetch");
const { isLoggedIn } = require("./auth");

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
      } else {
        console.log("invalid inputs");
      }
    } catch (error) {
      console.log("check your internet");
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
          console.log("Already logged in");
          process.exit();
        }
        console.log("Logged in successfully");
        return json;
      } else {
        console.log("invalid credentials, register first");
      }
    } catch (error) {
      console.log("check your internet");
    }
  },
  newcommand: async data => {
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
        const error = new Error(json.message);
        error.response = json;
        throw error;
      }
    } else {
      console.log("you must log in");
    }
  },
  listcommand: async () => {
    const token = await isLoggedIn();
    if (token) {
      const response = await fetch(`${API_URL}/api/v1/cmd`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "access-token": token
        }
      });
      const json = await response.json();
      if (response.ok) {
        return json;
      } else {
        const error = new Error(json.message);
        error.response = json;
        throw error;
      }
    }
  }
};
