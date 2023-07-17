import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  timeDue: {
    type: String,
    required: true,
  },
  subtasks: {
    type: Number,
    default: 0,
  },
  isCompleted: {
    type: Number,
    default: 0,
  },
  inProgress: {
    type: Number,
    default: 10,
  },

  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdBy: {
    type: String,
    required: true,
  },
});

export const Project = mongoose.model("Project", projectSchema);
