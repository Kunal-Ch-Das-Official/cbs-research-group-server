/**
 * Delete Specific Project By Client Request Operations Handler
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 18/08/2024
 *
 * Description:
 * This controller handles the deletion of a specific project from the database
 * based on a client's request. It processes the request to remove a project
 * record identified by a unique identifier.
 *
 * Functionality:
 * - Receives a request with an identifier for the project to be deleted.
 * - Validates the identifier to ensure it corresponds to an existing project.
 * - Deletes the specified project record from the database.
 * - Handles any errors or issues that occur during the deletion process and returns
 *   appropriate responses to the client.
 *
 * Usage:
 * Use this controller to delete a specific project record from the database
 * when a client requests its removal. This operation is crucial for maintaining
 * accurate project records and responding to client needs.
 */

const {
  clearCache,
} = require("../../middlewares/cache-middleware/cacheMiddleware");
const projectModel = require("../../models/projects-model/projectModel");

const deleteProjectCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const getPrevProject = await projectModel.findById(id);
    if (!getPrevProject) {
      return res.status(404).json({
        error: "Requested project are not found!",
        message: "Please check the details.",
      });
    } else {
      const deleteReqProject = await projectModel.findByIdAndDelete(id);
      if (!deleteReqProject) {
        return res.status(406).json({
          error: "Request are not acceptable!",
          message: "Please try after some time.",
        });
      } else {
        clearCache(
          `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/cbs-labs/projects`
        );
        clearCache(
          `/iiest-shibpur/chemistry-department/cbs-research-groups/v1/cbs-labs/projects/${id}`
        );
        return res.status(200).json({
          message: "Requested project has been successfully removed!",
        });
      }
    }
  } catch (error) {
    console.log(
      "Unable to delete project due to internal server error.",
      error
    );
    return res.status(500).json({
      Error: error.message,
      Message: "Unable to delete project due to some technical error.",
    });
  }
};
module.exports = deleteProjectCtrl;
