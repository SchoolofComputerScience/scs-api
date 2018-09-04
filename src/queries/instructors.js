import {
  GraphQLList,
  GraphQLString
} from 'graphql';
import Db from '../db';
import _ from 'lodash';

import { CoursesType } from '../types/courses';

const Instructors = Db.models['instructors'];
const CourseSections = Db.models['course_sections'];
const Courses = Db.models['courses_by_semester'];

function buildCourse(row) {
  let course = {};
  course.college = row['instructor_course_sections.course_section_courses.college'];
  course.course_id = row['instructor_course_sections.course_section_courses.course_id'];
  course.course_number = row['instructor_course_sections.course_section_courses.course_number'];
  course.department = row['instructor_course_sections.course_section_courses.department'];
  course.description = row['instructor_course_sections.course_section_courses.description'];
  course.graduate_level = row['instructor_course_sections.course_section_courses.graduate_level'];
  course.lecture_distinction = row['instructor_course_sections.course_section_courses.lecture_distinction'];
  course.long_title = row['instructor_course_sections.course_section_courses.long_title'];
  course.s3_department = row['instructor_course_sections.course_section_courses.s3_department'];
  course.semester = row['instructor_course_sections.course_section_courses.semester'];
  course.semester_code = row['instructor_course_sections.course_section_courses.semester_code'];
  course.units = row['instructor_course_sections.course_section_courses.units'];
  course.year = row['instructor_course_sections.course_section_courses.year'];

  return course;
}

function queryInstructorCourses(args) {
  let query_options = {
    raw: true,
    include: [{
      model: CourseSections,
      as: 'instructor_course_sections',
      raw: true,
      include: [{
        model: Courses,
        as: 'course_section_courses'
      }]
    }],
    required: true
  }

  if (args && args.scid) {
    query_options.where = { scid: args.scid }
  }

  return Instructors.findAll(query_options).then(data => {
    const data_length = data.length;
    let results = [];

    for (let i = 0; i < data_length; i++) {
      let course = buildCourse(data[i]);
      if (course) {
        results.push(course);
      }
    }

    return _.uniqBy(results, 'course_id');
  });
}

export default {
  type: new GraphQLList(CoursesType),
  description: 'List of Members For an Area',
  args: {
    scid: { type: GraphQLString }
  },
  resolve: function (args) {
    if (args && args.scid) {
      return queryInstructorCourses(args);
    }
  }
}

