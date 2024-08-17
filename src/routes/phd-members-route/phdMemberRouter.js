// Content: PHD Members Router.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 16/08/2024
// Details: This is the router file for handle all routes of phd members of cbs research groups.

const express = require("express");
const multerSingleUploader = require("../../middlewares/multer-single-file-handler/multerSingleFileHandler");
const uploadPhdMemberCtrl = require("../../controller/member-controllers/phd-members-controller/uploadPhdMemberCtrl");
const updatePhdMemberCtrl = require("../../controller/member-controllers/phd-members-controller/updatePhdMemberCtrl");
const getPhdMembersCtrl = require("../../controller/member-controllers/phd-members-controller/getPhdMembersCtrl");
const getSinglePhdMemberCtrl = require("../../controller/member-controllers/phd-members-controller/getSinglePhdMemberCtrl");
const deletePhdMemberCtrl = require("../../controller/member-controllers/phd-members-controller/deletePhdMemberCtrl");

const phdMembersRouter = express.Router();

// Declaration Of Upload Route Segment:
phdMembersRouter.post(
  "/members",
  multerSingleUploader.single("profilePicture"),
  uploadPhdMemberCtrl
);

// Declaration Of Update Route Segment:
phdMembersRouter.patch(
  "/members/:id",
  multerSingleUploader.single("profilePicture"),
  updatePhdMemberCtrl
);

// Declaration Of Get All Route Segment:
phdMembersRouter.get("/members", getPhdMembersCtrl);

// Declaration Of Get Single Route Segment:
phdMembersRouter.get("/members/:id", getSinglePhdMemberCtrl);

// Declaration Of Delete Route Segment:
phdMembersRouter.delete("/members/:id", deletePhdMemberCtrl);

module.exports = phdMembersRouter;
