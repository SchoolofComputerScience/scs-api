import mongoose from 'mongoose';
mongoose.Promise = Promise;

const Schema = mongoose.Schema

const CoursesSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    description: String,
    courseNumber: String,
    meetings: [
      mongoose.Schema({
        endTime: String,
        building: String,
        room: String,
        startTime: String,
        days: String,
      })
    ],
    childCourses: [
      mongoose.Schema({
        section: String,
        semesterCode: String,
        detailUri: String,
        courseNumber: String
      })
    ],
    deliveryMode: String,
    s3Department: String,
    department: String,
    courseCode: String,
    title: String,
    parentCourse: mongoose.Schema({
      section: String,
      semesterCode: String,
      detailUri: String,
      courseNumber: String
    }),
    programLocation: String,
    level: String,
    isStudentPresenceRequired: String,
    crossListedCourses: [
      mongoose.Schema({
        section: String,
        semesterCode: String,
        detailUri: String,
        courseNumber: String
      })
    ],
    units:  String,
    longTitle:  String,
    instructors: [
      mongoose.Schema({
        andrewId: String,
        scid: String,
        lastName: String,
        firstName: String,
        email: String,
      })
    ],
    college: String,
    section: String,
    semesterCode: String,
    semester: String,
    year: Number,
  },
  { collection : 'courses'}
)

export default mongoose.model('courses', CoursesSchema, 'courses')
