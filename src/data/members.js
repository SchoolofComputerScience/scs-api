import mongoose from 'mongoose';
mongoose.Promise = Promise;

const Schema = mongoose.Schema

const DirectorySchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    andrew_id: String,
    biography: String,
    display_email: String,
    display_name: String,
    email: String,
    family_name: String,
    fax_phone: String,
    given_name: String,
    homepage_url: String,
    hr_relationship: String,
    hr_relationship_class: String,
    hr_relationship_desc: String,
    image_url: String,
    is_alum: Boolean,
    middle_name: String,
    name_suffix: String,
    phone_area_code: Number,
    phone_area_code_secondary: Number,
    phone_exchange: Number,
    phone_extension: String,
    phone_extension_secondary: String,
    positions: [{
      building: String,
      department: String,
      department_name: String,
      hr_department: String,
      performance_supervisor: String,
      performance_supervisor_scid: String,
      primary_position: Boolean,
      room: String,
      scs_position_class: String,
      scs_position_desc: String,
      title: String
    }],
    research_areas: [
      mongoose.Schema({
        area_id: String,
        title: String
      })
    ],
    scid: String,
    scs_id: String,
    scs_email: String,
    scs_relationship_class: String,
    scs_relationship_subclass: String,
    scs_relationship_desc: String
  },
  { collection : 'directory'}
);

export default mongoose.model('directory', DirectorySchema, 'directory');
