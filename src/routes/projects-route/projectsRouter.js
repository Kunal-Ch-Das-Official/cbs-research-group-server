/**
 * Projects Router
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 19/08/2024
 *
 * Description:
 * This router manages all routes related to projects for the
 * CBS Research Group. It defines endpoints for handling project data,
 * including operations such as creating, reading, updating, and
 * deleting project records.
 *
 * Usage:
 * Use this router to manage routes for interacting with project data.
 * It ensures that requests related to projects are properly processed
 * and routed to the appropriate handlers or services.
 */

const express = require("express");
const uploadProjectCtrl = require("../../controller/project-controllers/uploadProjectCtrl");
const updateProjectCtrl = require("../../controller/project-controllers/updateProjectCtrl");
const deleteProjectCtrl = require("../../controller/project-controllers/deleteProjectCtrl");
const getProjectsCtrl = require("../../controller/project-controllers/getProjectsCtrl");
const checkAdminAuth = require("../../middlewares/auth-middleware/authAdminMiddleware");
const {
  cacheMiddleware,
} = require("../../middlewares/cache-middleware/cacheMiddleware");

const projectsRouter = express.Router();

// Declaration Of Upload Route Segment:
projectsRouter.post("/projects", checkAdminAuth, uploadProjectCtrl);

// Declaration Of Update Route Segment:
projectsRouter.patch("/projects/:id", checkAdminAuth, updateProjectCtrl);

// Declaration Of Get All Route Segment:
projectsRouter.get("/projects", cacheMiddleware, getProjectsCtrl);

// Declaration Of Get Single Route Segment:
projectsRouter.get("/projects/:id", cacheMiddleware, getProjectsCtrl);

// Declaration Of Delete Route Segment:
projectsRouter.delete("/projects/:id", checkAdminAuth, deleteProjectCtrl);

module.exports = projectsRouter;
