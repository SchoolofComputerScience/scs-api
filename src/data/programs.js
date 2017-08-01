import mongoose from 'mongoose';
mongoose.Promise = Promise;

const Schema = mongoose.Schema

const ProgramsSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    additional_degree: Boolean,
    degree_level: String,
    department: [String],
    description: String,
    graduate_level: String,
    program_alias: String,
    program_id: String,
    program_name: String,
    url: String,
    goals: [{
      track_id: String,
      goal: String
    }],
    tracks: [{
      track_id: String,
      track_name: String
    }],
    learning_outcomes: [{
      track_id: String,
      outcomes: [String]
    }],
    areas: [{
      track_id: String,
      areas: [{
        title: String,
        area_id: String
      }]
    }]
  },
  { collection : 'programs'}
)

export default mongoose.model('programs', ProgramsSchema, 'programs')
