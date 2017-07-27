import mongoose from 'mongoose';
mongoose.Promise = Promise;

const Schema = mongoose.Schema

const PublicationSchema = new Schema(
  {
    _id:  mongoose.Schema.Types.ObjectId,
    authors:  String,
    desc:  String,
    gs_citation_count: Number,
    gs_citation_guid:  String,
    gs_citation_url:  String,
    gs_profile_guid:  String,
    journal:  String,
    pages:  String,
    pub_date:  String,
    pub_format:  String,
    pub_url:  String,
    pub_year: Number,
    publisher:  String,
    timestamp:  String,
    title:  String,
    scid:  String,
  },
  { collection : 'gs_profile'}
)

export default mongoose.model('gs_publications', PublicationSchema, 'gs_publications');
