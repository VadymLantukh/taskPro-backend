import { model, Schema } from 'mongoose';

const columnSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: 'board',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'task',
      },
    ],
  },
  { versionKey: false, timestamps: true },
);

const ColumnCollection = model('column', columnSchema);

export default ColumnCollection;
