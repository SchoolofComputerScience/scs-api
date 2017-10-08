import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql';

import MemberData from '../data/members';

export const CoursesType = new GraphQLObjectType({
  name: 'Courses',
  description: 'List of courses',
  fields: () => ({
    _id: { type: GraphQLString },
    college: { type: GraphQLString },
    course_id: { type: GraphQLString },
    course_number: { type: GraphQLString },
    department: { type: GraphQLString },
    description: { type: GraphQLString },
    graduate_level: { type: GraphQLString },
    long_title: { type: GraphQLString },
    s3_department: { type: GraphQLString },
    sections: { type: new GraphQLList(CourseSectionType) },
    semester: { type: GraphQLString },
    semester_code: { type: GraphQLString },
    units:  { type: GraphQLString },
    year: { type: GraphQLInt },
   })
})

export const CourseSectionType = new GraphQLObjectType({
  name: 'CourseSection',
  description: 'List of course sections',
  fields: () => ({
    course_section_id: { type: GraphQLString },
    delivery_mode: { type: GraphQLString },
    level: { type: GraphQLString },
    location: { type: GraphQLString },
    long_title: { type: GraphQLString },
    presence_required: { type: GraphQLString },
    section: { type: GraphQLString },
    title: { type: GraphQLString },
    child_courses: { type: new GraphQLList(CourseListType) },
    cross_listed_courses: { type: new GraphQLList(CourseListType) },
    instructors: {
      description: 'Course instructors',
      type: new GraphQLList(CourseInstructorType),
      resolve: (args) => args.instructors
    },
    meetings: { type: new GraphQLList(CourseMeetingType) },
    parent_course: { type: CourseListType }
  })
})

export const CourseInstructorType = new GraphQLObjectType({
  name: 'CourseInstructor',
  description: 'List of course instructors',
  fields: () => ({
    andrew_id: { type: GraphQLString },
    email: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    scid: { type: GraphQLString },
    valid: {
      type: GraphQLBoolean,
      resolve: function(instructor){
        return MemberData.findOne({'scid': `${instructor.scid}`}).then((data) => {
          if (data)
            return true;
          else
            return false;
        });
      }
    }
  })
})

export const CourseListType = new GraphQLObjectType({
  name: 'CourseList',
  description: 'Course list schema',
  fields: () => ({
    course_number: { type: GraphQLString },
    section: { type: GraphQLString },
    semester_code: { type: GraphQLString }
  })
})

export const CourseMeetingType = new GraphQLObjectType({
  name: 'CourseMeeting',
  description: 'Course Meeting',
  fields: () => ({
    building: { type: GraphQLString },
    days: { type: GraphQLString },
    end_time: { type: GraphQLString },
    room: { type: GraphQLString },
    start_time: { type: GraphQLString },
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
