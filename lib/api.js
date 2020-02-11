const API_URL = "http://localhost:5000";
const fetch = require("node-fetch");
module.exports = {
  register: async user => {
    const response = await fetch(`${API_URL}/api/v1/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(user)
    });
    const json = await response.json();
    if (response.ok) {
      console.log({ token: json.token });
    } else {
      const error = new Error(json.message);
      error.response = json;
      throw error;
    }
  },

  login: async credentials => {
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
      console.log({ token: json.token });
    } else {
      const error = new Error(json.message);
      error.response = json;
      throw error;
    }
  },
  newcommand: async data => {
    const response = await fetch(`${API_URL}/api/v1/cmd`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "access-token": data.token
      },
      body: JSON.stringify(data)
    });
    const json = await response.json();
    if (response.ok) {
      console.log(json);
    } else {
      const error = new Error(json.message);
      error.response = json;
      throw error;
    }
  },
  listcommand: async credentials => {
    const response = await fetch(`${API_URL}/api/v1/cmd`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "access-token": credentials.token
      }
    });
    const json = await response.json();
    if (response.ok) {
      console.log(json);
    } else {
      const error = new Error(json.message);
      error.response = json;
      throw error;
    }
  }
};
