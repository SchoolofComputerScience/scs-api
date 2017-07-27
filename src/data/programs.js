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
    url: String
  },
  { collection : 'programs'}
)

export default mongoose.model('programs', ProgramsSchema, 'programs')
