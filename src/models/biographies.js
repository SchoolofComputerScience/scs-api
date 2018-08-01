import mongoose from 'mongoose';
mongoose.Promise = Promise;

const Schema = mongoose.Schema

const BiographiesSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    andrew_id: String,
    biography: String,
    department: String,
    email: String,
    homepage_url: String,
    name: String,
    image_url: String,
    title: String,
    scid: String
  },
  { collection : 'biographies'}
)

export default mongoose.model('biographies', BiographiesSchema, 'biographies');
