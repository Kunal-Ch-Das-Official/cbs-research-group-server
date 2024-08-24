/**
 * Master Alumni Update Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 16/08/2024
 *
 * Description:
 * This controller handles the process of updating existing records of
 * master alumni in the database. It manages modifications to alumni data
 * based on client or admin requests.
 *
 * Functionality:
 * - Receives and processes requests to update existing master alumni
 *   information.
 * - Validates the incoming data to ensure it meets required formats and
 *   criteria.
 * - Updates the specified alumni records in the database with the new data.
 * - Provides appropriate responses for successful and failed update
 *   operations.
 *
 * Usage:
 * Use this controller to manage the updating of master alumni records
 * in the database. It ensures that existing alumni data can be accurately
 * modified as needed.
 */

const {
  clearCache,
} = require("../../../middlewares/cache-middleware/cacheMiddleware");
const mastersAlumniModel = require("../../../models/alumni-model/masters-alumni-model/mastersAlumniModel");
const customSingleDestroyer = require("../../../utils/cloudinary-single-destroyer/customSingleDestroyer");
const customSingleUploader = require("../../../utils/cloudinary-single-uploader/customSingleUploader");
const cleanupFile = require("../../../utils/custom-file-cleaner/localFileCleaner");

const updateMastersAlumniCtrl = async (req, res) => {
  const { id } = req.params;
  const {
    alumniName,
    emailId,
    phoneNumber,
    bscDoneFrom,
    researchGateId,
    googleScholarId,
    yearOfPassout,
    details,
  } = req.body;
  const filePath = req.file ? req.file.path : null;
  let newAlumniImage, newCloudPublicId;

  try {
    const getPreviousAlumniInfo = await mastersAlumniModel.findById(id);
    if (!getPreviousAlumniInfo) {
      filePath && cleanupFile(filePath);
      return res.status(404).json({ error: "Requested resources not found" });
    }

    const newAlumniName = alumniName || getPreviousAlumniInfo.alumniName;
    const newEmailId = emailId || getPreviousAlumniInfo.emailId;
    const newPhoneNumber = phoneNumber || getPreviousAlumniInfo.phoneNumber;
    const newBscDoneFrom = bscDoneFrom || getPreviousAlumniInfo.bscDoneFrom;
    const newResearchGateId =
      researchGateId || getPreviousAlumniInfo.researchGateId;
    const newGoogleScholarId =
      googleScholarId || getPreviousAlumniInfo.googleScholarId;
    const newYearOfPassout =
      yearOfPassout || getPreviousAlumniInfo.yearOfPassout;
    const newAlumniDetails = details || getPreviousAlumniInfo.details;

    if (req.file) {
      const { storedDataAccessUrl, storedDataAccessId } =
        await customSingleUploader(filePath, "masters_alumni_image");
      newAlumniImage = storedDataAccessUrl;
      newCloudPublicId = storedDataAccessId;

      getPreviousAlumniInfo.profilePicturePublicId &&
        (await customSingleDestroyer(
          getPreviousAlumniInfo.profilePicturePublicId
        ));

      cleanupFile(filePath);
    } else {
      newAlumniImage = getPreviousAlumniInfo.profilePicture;
      newCloudPublicId = getPreviousAlumniInfo.profilePicturePublicId;
    }

    const updatedAlumniInfo = {
      alumniName: newAlumniName,
      profilePicture: newAlumniImage,
      profilePicturePublicId: newCloudPublicId,
      emailId: newEmailId,
      phoneNumber: newPhoneNumber,
      bscDoneFrom: newBscDoneFrom,
      researchGateId: newResearchGateId,
      googleScholarId: newGoogleScholarId,
      yearOfPassout: newYearOfPassout,
      details: newAlumniDetails,
    };

    const updateAlumniInfo = await mastersAlumniModel.findByIdAndUpdate(
      id,
      updatedAlumniInfo,
      { new: true }
    );

    if (!updateAlumniInfo) {
      return res.status(405).json({
        error: "This operations are not allowed!",
        message: "Please check the details and try again later!",
      });
    } else {
      clearCache(
        `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/masters/alumni-data/${id}`
      );
      clearCache(
        `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/masters/alumni-data`
      );

      return res.status(200).json({
        message: "Masters alumni info's has been successfully updated!",
      });
    }
  } catch (error) {
    filePath && cleanupFile(filePath);
    console.error("Unable to update due to some technical error:", error);
    return res.status(500).json({
      error: "Unable to update due to some technical error",
      details: error.message,
    });
  }
};

module.exports = updateMastersAlumniCtrl;
