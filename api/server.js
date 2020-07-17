const express = require("express");
const helmet = require("helmet");
const projectRoutes = require("../api/project/projectRoutes");

const server = express();

server.use(helmet());
server.use(express.json());
server.use("/projects", projectRoutes);
server.use("/", (req, res) => res.send("Api is up and running!"));

module.exports = server;
