// Content: Doctorate Alumni Router.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 16/08/2024
// Details: This is the router file for handle all routes of doctorate alumni of cbs research groups.

const express = require("express");
const uploadDoctorateAlumniCtrl = require("../../controller/alumni-controllers/doctorate-alumni-controller/uploadDoctorateAlumniCtrl");
const updateDoctorateAlumniCtrl = require("../../controller/alumni-controllers/doctorate-alumni-controller/updateDoctorateAlumniCtrl");
const getDoctorateAlumniCtrl = require("../../controller/alumni-controllers/doctorate-alumni-controller/getDoctorateAlumniCtrl");
const deleteDoctorateAlumniCtrl = require("../../controller/alumni-controllers/doctorate-alumni-controller/deleteDoctorateAlumniCtrl");
const multerLocalFileUploader = require("../../middlewares/multer-localfile-uploader/multerLocalFileUploader");

// Use Express As Router //
const doctorateAlumniRouter = express.Router();

// Declaration Of Upload Route Segment:
doctorateAlumniRouter.post(
  "/alumni-data",
  multerLocalFileUploader.single("profilePicture"),
  uploadDoctorateAlumniCtrl
);

// Declaration Of Update Route Segment:
doctorateAlumniRouter.patch(
  "/alumni-data/:id",
  multerLocalFileUploader.single("profilePicture"),
  updateDoctorateAlumniCtrl
);

// Declaration Of Get All Data Route Segment:
doctorateAlumniRouter.get("/alumni-data", getDoctorateAlumniCtrl);

// Declaration Of Get Single Data Route Segment:
doctorateAlumniRouter.get("/alumni-data/:id", getDoctorateAlumniCtrl);

// Declaration Of Delete Route Segment:
doctorateAlumniRouter.delete("/alumni-data/:id", deleteDoctorateAlumniCtrl);

module.exports = doctorateAlumniRouter;
