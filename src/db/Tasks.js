import { Schema, model } from 'mongoose';
import { priorityList } from '../constants/tasks';
import { handleSaveError, setUpdateSettings } from './hooks';
const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: priorityList,
      default: 'Without',
    },
    deadline: {
      type: Date,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    columnId: {
      type: Schema.Types.ObjectId,
      ref: 'column',
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: 'board',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
taskSchema.post('save', handleSaveError);

taskSchema.pre('findOneAndUpdate', setUpdateSettings);

taskSchema.post('findOneAndUpdate', handleSaveError);

export const sortByListTasks = ['title', 'priority', 'deadline'];

const TasksCollection = model('tasks', taskSchema);

export default TasksCollection;
