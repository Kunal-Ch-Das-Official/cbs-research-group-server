// Content: Team Awards Router.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 19/08/2024
// Details: This is the router file for handle all routes of team awards of cbs research groups.

const express = require("express");
const uploadTeamAwardCtrl = require("../../controller/awards-controllers/team-awards-controller/uploadTeamAwardCtrl");
const updateTeamAwardCtrl = require("../../controller/awards-controllers/team-awards-controller/updateTeamAwardCtrl");
const deleteTeamAwardCtrl = require("../../controller/awards-controllers/team-awards-controller/deleteTeamAwardCtrl");
const getTeamAwardsCtrl = require("../../controller/awards-controllers/team-awards-controller/getTeamAwardsCtrl");

const teamAwardsRouter = express.Router();

// Declaration Of Upload Route Segment:
teamAwardsRouter.post("/awards", uploadTeamAwardCtrl);

// Declaration Of Update Route Segment:
teamAwardsRouter.patch("/awards/:id", updateTeamAwardCtrl);

// Declaration Of Get All Route Segment:
teamAwardsRouter.get("/awards", getTeamAwardsCtrl);

// Declaration Of Get Single Route Segment:
teamAwardsRouter.get("/awards/:id", getTeamAwardsCtrl);

// Declaration Of Delete Route Segment:
teamAwardsRouter.delete("/awards/:id", deleteTeamAwardCtrl);

module.exports = teamAwardsRouter;
