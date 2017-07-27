import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt
} from 'graphql';

export const CoursesType = new GraphQLObjectType({
  name: 'Courses',
  description: 'List of courses',
  fields: () => ({
    _id: { type: GraphQLString },
    description: { type: GraphQLString },
    courseNumber: { type: GraphQLString },
    meetings: {
      type: new GraphQLList(CourseMeetingType)
    },
    childCourses: {
      type: new GraphQLList(CourseListType)
    },
    deliveryMode: { type: GraphQLString },
    s3Department: { type: GraphQLString },
    department: { type: GraphQLString },
    courseCode: { type: GraphQLString },
    title: { type: GraphQLString },
    parentCourse: {
      type: new GraphQLList(CourseListType)
    },
    programLocation: { type: GraphQLString },
    level: { type: GraphQLString },
    isStudentPresenceRequired: { type: GraphQLString },
    crossListedCourses: {
      type: new GraphQLList(CourseListType)
    },
    units:  { type: GraphQLString },
    longTitle:  { type: GraphQLString },
    instructors: {
      description: 'class instructors',
      type: new GraphQLList(CourseInstructorType),
      resolve: (args) => args.instructors
    },
    college: { type: GraphQLString },
    section: { type: GraphQLString },
    semesterCode: { type: GraphQLString },
    semester: { type: GraphQLString },
    year: { type: GraphQLInt }
   })
})

export const CourseInstructorType = new GraphQLObjectType({
  name: 'CourseInstructor',
  description: 'List of course instructors',
  fields: () => ({
    andrewId: { type: GraphQLString },
    scid: { type: GraphQLString },
    lastName: { type: GraphQLString },
    firstName: { type: GraphQLString },
    email: { type: GraphQLString }
  })
})

export const CourseListType = new GraphQLObjectType({
  name: 'CourseList',
  description: 'Course list schema',
  fields: () => ({
    section: { type: GraphQLString },
    semesterCode: { type: GraphQLString },
    detailUri: { type: GraphQLString },
    courseNumber: { type: GraphQLString }
  })
})

export const CourseMeetingType = new GraphQLObjectType({
  name: 'CourseMeeting',
  description: 'Course Meeting',
  fields: () => ({
    endTime: { type: GraphQLString },
    building: { type: GraphQLString },
    room: { type: GraphQLString },
    startTime: { type: GraphQLString },
    days: { type: GraphQLString }
  })
})

export const CourseAggregateIntType = new GraphQLObjectType({
  name: 'CourseAggregateIntType',
  description: 'Aggregation of Course Ints',
  fields: () => ({
    _id: { type: GraphQLInt }
  })
})

export const CourseAggregateStringType = new GraphQLObjectType({
  name: 'CourseAggregateStringType',
  description: 'Aggregation of Course Strings',
  fields: () => ({
    _id: { type: GraphQLString }
  })
})
