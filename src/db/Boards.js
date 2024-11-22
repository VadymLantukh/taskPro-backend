import { Schema, model } from 'mongoose';
import { boardIcons, boardImages } from '../constants/boards.js';

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    backgroundImage: {
      type: String,
      enum: [...boardImages, null],
      default: null,
    },
    icon: {
      type: String,
      enum: boardIcons,
      default: 'icon_1',
    },
    columns: [
      {
        type: Schema.Types.ObjectId,
        ref: 'column',
        default: [],
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
);

const BoardCollection = model('board', boardSchema);

export default BoardCollection;
