import mongoose from 'mongoose';
mongoose.Promise = Promise;

const Schema = mongoose.Schema

const DepartmentsSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    department_id: String,
    department_name: String,
    college_id: String,
    college_name: String,
    scs_relationship: String,
    scs_type: String,
    cmu_type: String,
    url: String
  },
  { collection : 'departments'}
)

export default mongoose.model('departments', DepartmentsSchema, 'departments')
