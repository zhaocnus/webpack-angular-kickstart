'use strict';

import mongoose from 'mongoose';

const ScoreSchema = new mongoose.Schema({
  userId: String,
  eventName: String,
  userName: String,
  levelId: String,
  levelScore: { type: Number, defaullt: 0 }
});

export default mongoose.model('Score', ScoreSchema);
