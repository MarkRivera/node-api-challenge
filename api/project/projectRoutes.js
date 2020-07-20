const express = require("express");
const router = express.Router();
const projectAPI = require("../../data/helpers/projectModel");

// GET
router.get("/", async (req, res) => {
  try {
    const projects = await projectAPI.get();
    res.status(200).json(projects);
  } catch (err) {
    res
      .status(500)
      .json({ message: "There was a problem in the server, sorry!" });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const project = await projectAPI.get(id);
  if (!project) {
    return res.status(500).json({
      errorMessage: "Sorry, could not find a project with that ID",
    });
  }
  return res.status(200).json(project);
});

// POST

router.post("/", async (req, res) => {
  const { name, description, completed } = req.body;
  const userCreatedProject = {
    name,
    description,
    completed,
  };

  try {
    const newProject = await projectAPI.insert(userCreatedProject);
    return res.status(200).json(newProject);
  } catch (error) {
    return res.status(500).json({
      errorMessage: "Something has gone horribly wrong, call for help",
    });
  }
});

// PUT

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const project = await projectAPI.update(id, req.body);

  if (!project) {
    return res.status(404).json({ message: "Sorry could not find project!" });
  }

  try {
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ errorMessage: "Something went wrong, sorry!" });
  }
});

// DELETE

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deletedProject = await projectAPI.remove(id);

  if (deletedProject) {
    return res
      .status(404)
      .json({ message: `${deletedProject} project(s) deleted` });
  }

  return res.status(500).json({ errorMessage: "Project does not exist" });
});

module.exports = router;
