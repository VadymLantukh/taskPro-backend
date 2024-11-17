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
    order: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

columnSchema.index({ boardId: 1, order: 1 }, { unique: true });
const ColumnCollection = model('column', columnSchema);

export default ColumnCollection;
