import { model, Schema } from 'mongoose';

import { emailRegexp } from '../constants/emailRegexp.js';
import { themeType } from '../constants/themeType.js';

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      enum: themeType,
      default: 'light',
    },
    avatar: {
      type: String,
    },
    boards: [
      {
        type: Schema.Types.ObjectId,
        ref: 'board',
        default: [],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', usersSchema);
