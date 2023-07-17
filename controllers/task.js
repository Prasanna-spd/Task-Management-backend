import ErrorHandler from "../middlewares/error.js";
import { Project } from "../models/project.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task added Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res, next) => {
  try {
    const userid = req.user._id;

    const tasks = await Task.find({ user: userid });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

// export const updateTask = async (req, res, next) => {
//   try {
//     const task = await Task.findById(req.params.id);

//     if (!task) return next(new ErrorHandler("Task not found", 404));

//     task.isCompleted = !task.isCompleted;
//     await task.save();

//     res.status(200).json({
//       success: true,
//       message: "Task Updated!",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    const project = await Project.findOne({
      employees: req.user._id,
    });

    console.log(project);

    if (!project) {
      return next(
        new ErrorHandler(
          "Project not found or you are not authorized to update this task",
          404
        )
      );
    }

    if (!task) return next(new ErrorHandler("Task not found", 404));

    project.subtasks -= 1;
    await project.save();
    await task.deleteOne();

    res.status(200).json({
      message: "Task Deleted!",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// export const updateTask = async (req, res, next) => {
//   try {
//     const task = await Task.findById(req.params.id);

//     if (!task) return next(new ErrorHandler("Task not found", 404));

//     const project = await Project.findOne({
//       employees: req.user._id,
//     });

//     if (!project) {
//       return next(
//         new ErrorHandler(
//           "Project not found or you are not authorized to update this task",
//           404
//         )
//       );
//     }

//     const originalIsCompleted = task.isCompleted;

//     task[req.body.field] = !task[req.body.field];
//     await task.save();

//     // Update the subtasks count in the associated project
//     if (originalIsCompleted !== task.isCompleted) {
//       if (task.isCompleted) {
//         project.subtasks += 1;
//       } else {
//         project.subtasks -= 1;
//       }

//       await project.save();
//     }

//     res.status(200).json({
//       success: true,
//       message: "Task Updated!",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const updateTask = async (req, res, next) => {
  try {
    const { isCompleted, inProgress } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) return next(new ErrorHandler("Task not found", 404));

    const project = await Project.findOne({
      employees: req.user._id,
    });
    console.log(project);
    if (!project) {
      return next(
        new ErrorHandler(
          "Project not found or you are not authorized to update this task",
          404
        )
      );
    }
    task.isCompleted = isCompleted;
    task.inProgress = inProgress;

    await task.save();

    // Update the subtasks count in the associated project
    if (task.isCompleted !== undefined && task.isCompleted !== null) {
      if (task.isCompleted) {
        project.isCompleted += 1;
      } else {
        if (project.isCompleted > 0) {
          project.isCompleted -= 1;
        } else {
          project.isCompleted = 0;
        }
      }
    }

    if (task.inProgress !== undefined && task.inProgress !== null) {
      if (task.inProgress) {
        if (project.inProgress < 10) {
          project.inProgress += 1;
        } else {
          project.inProgress = 10;
        }
      } else {
        if (project.inProgress > 0) {
          project.inProgress -= 1;
        } else {
          project.inProgress = 0;
        }
      }
    }

    await project.save();

    res.status(200).json({
      success: true,
      message: "Task Updated!",
    });
  } catch (error) {
    next(error);
  }
};
