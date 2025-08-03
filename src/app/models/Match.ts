import mongoose, { Schema, model, models } from 'mongoose';

const MatchSchema = new Schema({
  fixtureId: Number,
  date: String,
  teams: {
    home: String,
    away: String,
  },
  status: String,
  score: {
    fulltime: {
      home: Number,
      away: Number,
    },
  },
  lineups: Array,
  stats: Array,
}, { timestamps: true });

export default models.Match || model("Match", MatchSchema);
