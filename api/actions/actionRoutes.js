const express = require("express");
const router = express.Router();
const actionAPI = require("../../data/helpers/actionModel");
const projectAPI = require("../../data/helpers/projectModel");

// GET
router.get("/:id/actions", async (req, res) => {
  const actions = await projectAPI.getProjectActions(req.params.id);
  res.status(200).json(actions);
});

router.get("/:id/actions/:actionId", async (req, res) => {
  const actions = await projectAPI.getProjectActions(req.params.id);
  const action = actions.filter((action) => action.id == req.params.actionId);

  res.status(200).json(action);
});

// POST

router.post("/:id/actions", async (req, res) => {
  const userCreatedAction = req.body;
  try {
    const newAction = await actionAPI.insert(userCreatedAction);
    return res.status(200).json(newAction);
  } catch (error) {
    return res.status(500).json({
      errorMessage: "Something has gone horribly wrong, call for help",
    });
  }
});

// UPDATE

router.put("/:id/actions/:actionId", async (req, res) => {
  const actionID = req.params.actionId;
  const action = await actionAPI.update(actionID, req.body);

  if (!action) {
    return res.status(404).json({ message: "Sorry could not find action!" });
  }

  try {
    res.status(200).json(action);
  } catch (error) {
    res.status(500).json({ errorMessage: "Something went wrong, sorry!" });
  }
});

// DELETE

router.delete("/:id/actions/:actionId", async (req, res) => {
  const actionID = req.params.actionId;
  const deletedAction = await actionAPI.remove(actionID);

  if (deletedAction) {
    return res
      .status(404)
      .json({ message: `${deletedAction} action(s) deleted` });
  }

  return res.status(500).json({ errorMessage: "Action does not exist" });
});

module.exports = router;
