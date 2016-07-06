'use strict';

import mongoose from 'mongoose';
import { isEmail } from 'validator';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ true, 'User name is required' ],
    unique: true
  },
  email: {
    type: String,
    validate: [ isEmail, 'Invalid email' ]
  },
  eventName: String
});

export default mongoose.model('User', UserSchema);
