// Content: Delete Specific PHD Members Info By Client Request Operations Handler.
// Project: CBS-Research-Group-Backend
// Author: Kunal Chandra Das.
// Date: 17/08/2024
// Details: Role of this controller is to delete single phd members data from database by client request .

const phdMemberModel = require("../../../models/members-model/phd-member-model/phdMemberModel");
const customSingleDestroyer = require("../../../utils/cloudinary-single-destroyer/customSingleDestroyer");

const deletePhdMemberCtrl = async (req, res) => {
  const id = req.params.id;
  try {
    const getRequestedMembersInfo = await phdMemberModel.findById(id);
    const phdMembersImgPublicId =
      getRequestedMembersInfo.profilePicturePublicId;
    if (!getRequestedMembersInfo) {
      res.status(404).json({
        error: "Requested resources are not found!",
        message: "Please check the given details.",
      });
    } else {
      phdMembersImgPublicId &&
        (await customSingleDestroyer(phdMembersImgPublicId));
      const deleteRequestedMembersInfo = await phdMemberModel.findByIdAndDelete(
        id
      );
      if (!deleteRequestedMembersInfo) {
        res.status(406).json({
          message: "Your applications are not acceptable, try again later!",
        });
      } else {
        res.status(200).json({
          message: "Requested resources has been successfully deleted!",
        });
      }
    }
  } catch (error) {
    console.log("There is some technical error occared!", error);
    res.status(500).json({
      Error: error,
      Message: `Unable to remove phd members info due to:${error.message}`,
    });
  }
};
module.exports = deletePhdMemberCtrl;
