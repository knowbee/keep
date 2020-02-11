const { login, listcommand, newcommand, register } = require("./lib/api");

console.log(
  newcommand({
    command: "pwd",
    description: "working directory",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU0MmUzY2EwNDc5OTkxNTA4NDIyYTNlIiwiZW1haWwiOiJ0ZXN0aW5nMUBnbWFpbC5jb20ifSwiaWF0IjoxNTgxNDQyNjE3LCJleHAiOjE1ODE1MjkwMTd9.eaDs8aFpa4VpDD7CbLQIm807TmDBGqWlYi4gMPwRUOk"
  })
);
