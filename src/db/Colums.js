import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';

const columnSchema = new Schema(
  {
    boardId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'board',
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    title: {
      type: String,
      required: true,
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        default: [],
      },
    ],
  },
  { versionKey: false, timestamps: true },
);

columnSchema.post('save', handleSaveError);

columnSchema.pre('findOneAndUpdate', setUpdateSettings);

columnSchema.post('findOneAndUpdate', handleSaveError);

const ColumnCollection = model('column', columnSchema);

export default ColumnCollection;
