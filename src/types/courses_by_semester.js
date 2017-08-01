/// WIP

// import {
//   GraphQLObjectType,
//   GraphQLList,
//   GraphQLString,
//   GraphQLInt
// } from 'graphql';
//
// _id:
// college: { type: GraphQLString },
// course_number: { type: GraphQLString },
// department: { type: GraphQLString },
// description: { type: GraphQLString },
// graduate_level: { type: GraphQLString },
// s3_department: { type: GraphQLString },
// sections: {
//   type: new GraphQLList(CourseSections)
// },
//
//   0: Object
//     child_courses: null
//     course_section_id: F17-53831-A
//     cross_listed_courses: Array[1]
//     0: Object
//       section: A
//       course_number: 53531
//       semester_code: F17
//       delivery_mode: FSS
//     instructors: Array[2]
//     0: Object
//       email: jschell@andrew.cmu.edu
//       scid: jesse_schell
//       andrew_id: jschell
//       first_name: Jesse
//       last_name: Schell
//     1: Object
//       email: dculyba@andrew.cmu.edu
//       scid: david_culyba
//       andrew_id: dculyba
//       first_name: David
//       last_name: Culyba
//       location: PIT
//       long_title: Building Virtual Worlds
//       meetings: Array[2]
//         0: Object
//           room: MPR
//           days: R
//           room_id: ptc_mpr
//           building: PTC
//           end_time: 11:50AM
//           start_time: 09:30AM
//
//   parent_course: null
//   presence_required: Y
//   section: A
//   title: BUILDNG VIRTUAL WRLD
// semester: { type: GraphQLString },
// semester_code: { type: GraphQLString },
// timestamp: { type: GraphQLString },
// units: { type: GraphQLString },
// year: { type: GraphQLInt },
// course_id: { type: GraphQLString }
//
//
// export const CoursesType = new GraphQLObjectType({
//   name: 'Courses',
//   description: 'List of courses',
//   fields: () => ({
//     _id: { type: GraphQLString },
//     description: { type: GraphQLString },
//     courseNumber: { type: GraphQLString },
//     meetings: {
//       type: new GraphQLList(CourseMeetingType)
//     },
//     childCourses: {
//       type: new GraphQLList(CourseListType)
//     },
//     deliveryMode: { type: GraphQLString },
//     s3Department: { type: GraphQLString },
//     department: { type: GraphQLString },
//     courseCode: { type: GraphQLString },
//     title: { type: GraphQLString },
//     parentCourse: {
//       type: new GraphQLList(CourseListType)
//     },
//     programLocation: { type: GraphQLString },
//     level: { type: GraphQLString },
//     isStudentPresenceRequired: { type: GraphQLString },
//     crossListedCourses: {
//       type: new GraphQLList(CourseListType)
//     },
//     units:  { type: GraphQLString },
//     longTitle:  { type: GraphQLString },
//     instructors: {
//       description: 'class instructors',
//       type: new GraphQLList(CourseInstructorType),
//       resolve: (args) => args.instructors
//     },
//     college: { type: GraphQLString },
//     section: { type: GraphQLString },
//     semesterCode: { type: GraphQLString },
//     semester: { type: GraphQLString },
//     year: { type: GraphQLInt }
//    })
// })
//
// export const CourseSections = new GraphQLObjectType({
//   name: 'CourseSections',
//   description: 'List of course sections',
//   fields: () => ({
//     child_courses: // ,
//     course_section_id: { type: GraphQLString },
//     cross_listed_courses: //
//     delivery_mode: { type: GraphQLString },
//     instructors: //
//     location: { type: GraphQLString },
//     long_title: { type: GraphQLString },
//     meetings: //
//     parent_course: //
//     presence_required: { type: GraphQLString },
//     section: { type: GraphQLString },
//     title: { type: GraphQLString },
//   })
// })

// export const CourseListType = new GraphQLObjectType({
//   name: 'CourseList',
//   description: 'Course list schema',
//   fields: () => ({
//     section: { type: GraphQLString },
//     semesterCode: { type: GraphQLString },
//     detailUri: { type: GraphQLString },
//     courseNumber: { type: GraphQLString }
//   })
// })
//
// export const CourseMeetingType = new GraphQLObjectType({
//   name: 'CourseMeeting',
//   description: 'Course Meeting',
//   fields: () => ({
//     endTime: { type: GraphQLString },
//     building: { type: GraphQLString },
//     room: { type: GraphQLString },
//     startTime: { type: GraphQLString },
//     days: { type: GraphQLString }
//   })
// })
//
// export const CourseAggregateIntType = new GraphQLObjectType({
//   name: 'CourseAggregateIntType',
//   description: 'Aggregation of Course Ints',
//   fields: () => ({
//     _id: { type: GraphQLInt }
//   })
// })
//
// export const CourseAggregateStringType = new GraphQLObjectType({
//   name: 'CourseAggregateStringType',
//   description: 'Aggregation of Course Strings',
//   fields: () => ({
//     _id: { type: GraphQLString }
//   })
// })
