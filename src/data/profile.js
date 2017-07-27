import mongoose from 'mongoose';
mongoose.Promise = Promise;

const Schema = mongoose.Schema

const ProfileSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    scid: String,
    gs_affiliation: String,
    gs_areas: String,
    gs_citation_count: Number,
    gs_citation_count_five_year: Number,
    gs_fullname: String,
    gs_hindex: Number,
    gs_hindex_five_year: Number,
    gs_homepage_url: String,
    gs_i10index: Number,
    gs_i10index_five_year: Number,
    gs_image_url: String,
    gs_profile_guid: String,
    gs_profile_url: String,
  },
  { collection : 'gs_profile'}
)

export default mongoose.model('gs_profiles', ProfileSchema, 'gs_profiles');
