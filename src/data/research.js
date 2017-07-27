import mongoose from 'mongoose';
mongoose.Promise = Promise;

const Schema = mongoose.Schema

const ResearchAreasSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    area_id: String,
    description: String,
    gs_count: Number,
    members: [String],
    title: String
  },
  { collection : 'research_areas' }
)

export default mongoose.model('research_areas', ResearchAreasSchema, 'research_areas')
