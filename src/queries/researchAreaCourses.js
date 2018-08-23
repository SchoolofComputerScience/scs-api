import {
  GraphQLList,
  GraphQLString
} from 'graphql';
import Db from '../db';

import { ResearchAreasCourseType } from '../types/researchAreaCourses';

const ResearchAreaCourses = Db.models['research_courses'];
const CoursesBySemester = Db.models['courses_by_semester'];

function buildResearchAreaCourse(row) {
  let research_area_course = {};
  research_area_course.course_id = row.course_id;
  research_area_course.course_number = row.course_number;
  research_area_course.description = row.description;
  research_area_course.title = row['research_area_courses.long_title'];

  return research_area_course;
}

function queryResearchAreaCourses(args) {
  let query_options = {
    raw: true,
    include: [{
      model: CoursesBySemester,
      as: 'research_area_courses',
      required: true
    }]
  }

  if (args && args.area_id) {
    query_options.where = { area_id: args.area_id }
  }

  return ResearchAreaCourses.findAll(query_options).then(data => {
    const data_length = data.length;
    let results = [];

    for (let i = 0; i < data_length; i++) {
      results.push(buildResearchAreaCourse(data[i]));
    }

    return results;
  });
}

export default {
  type: new GraphQLList(ResearchAreasCourseType),
  description: 'List of Courses For an Area',
  args: {
    area_id: { type: GraphQLString }
  },
  resolve: function (parent, args) {
    if (args && args.area_id) {
      return queryResearchAreaCourses(args);
    }
  }
}

