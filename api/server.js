const express = require("express");
const helmet = require("helmet");
const projectRoutes = require("../api/project/projectRoutes");
const actionRoutes = require("../api/actions/actionRoutes");

const server = express();

server.use(helmet());
server.use(express.json());
server.use("/projects", projectRoutes);
server.use("/projects", actionRoutes);
server.use("/", (req, res) => res.send("Api is up and running!"));

module.exports = server;
