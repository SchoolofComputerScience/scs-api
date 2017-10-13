import mongoose from 'mongoose';
mongoose.Promise = Promise;

const Schema = mongoose.Schema

const CoursesSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    college: String,
    course_id: String,
    course_number: String,
    department: String,
    description: String,
    graduate_level: String,
    lecture_distinction: Boolean,
    long_title: String,
    s3_department: String,
    semester: String,
    semester_code: String,
    // timestamp: Date,
    units:  String,
    year: Number,

    areas: [
      mongoose.Schema({
        area_id: String,
        title: String
      })
    ],

    sections: [
      mongoose.Schema({
        course_section_id: String,
        delivery_mode: String,
        level: String,
        location: String,
        long_title:  String,
        presence_required: String,
        section: String,
        title: String,

        child_courses: [
          mongoose.Schema({
            course_number: String,
            section: String,
            semester_code: String
          })
        ],
        cross_listed_courses: [
          mongoose.Schema({
            course_number: String,
            section: String,
            semester_code: String
          })
        ],
        instructors: [
          mongoose.Schema({
            andrew_id: String,
            email: String,
            first_name: String,
            last_name: String,
            scid: String
          })
        ],
        meetings: [
          mongoose.Schema({
            building: String,
            days: String,
            end_time: String,
            room: String,
            room_id: String,
            start_time: String
          })
        ],
        parent_course: mongoose.Schema({
          course_number: String,
          section: String,
          semester_code: String
        }),
      })
    ]
  },
  { collection : 'courses_by_semester'}
)

export default mongoose.model('courses_by_semester', CoursesSchema)
