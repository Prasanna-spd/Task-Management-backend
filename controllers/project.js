import { Project } from "../models/project.js";

export const newProject = async (req, res) => {
  try {
    const { title, description, timeDue, subtasks } = req.body;

    const project = new Project({
      title,
      description,
      timeDue,
      subtasks,
      createdBy: req.user._id,
    });

    // Save the project to the database
    const savedProject = await project.save();

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project: savedProject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: error.message,
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    res.status(200).json({
      success: true,
      message: "Projects retrieved successfully",
      projects: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve projects",
      error: error.message,
    });
  }
};

export const getThisProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project retrieved successfully",
      project: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve project",
      error: error.message,
    });
  }
};

export const subscribe = async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.user._id; // Assuming the user ID is available in the request

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (req.user.role === "employee") {
      project.employees.push(userId);
      await project.save();
    } else {
      return res.status(403).json({
        success: false,
        message: "Only employees can subscribe to projects",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subscribed to project successfully",
      project: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to subscribe to project",
      error: error.message,
    });
  }
};

export const getSubscribedProjects = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(userId);
    const subscribedProjects = await Project.find({ employees: userId });

    if (subscribedProjects.length === 0) {
      return res
        .status(404)
        .json({ message: "No subscribed projects found for the user" });
    }

    res.status(200).json({ projects: subscribedProjects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProgress = async (req, res) => {
  const projectId = req.params.id;

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const { isCompleted, inProgress, notStarted } = project;

    res.status(200).json({ isCompleted, inProgress, notStarted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
