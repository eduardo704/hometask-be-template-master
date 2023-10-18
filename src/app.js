const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./model')
const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

const contractRoutes = require("./controls/contracts.controller");
const jobRoutes = require("./controls/jobs.controller");
const balancesRoutes = require("./controls/ballances.controller");
const adminRoutes = require("./controls/admin.controller");

app.use("/contracts", contractRoutes);
app.use("/jobs", jobRoutes);
app.use("/balances", balancesRoutes);
app.use("/admin", adminRoutes);




module.exports = app;
