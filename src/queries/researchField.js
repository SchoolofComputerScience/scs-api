import {
  GraphQLList,
  GraphQLString
} from 'graphql';
import Db from '../db';

import { ResearchAreaFieldsType } from '../types/research';
const ResearchAreasField = Db.models['research_field_discipline'];
const ResearchAreas = Db.models['research_area_field'];
const ResearchAreaCourses = Db.models['research_courses'];
const ResearchAreaMembers = Db.models['research_members'];

function buildResearchAreaField(row) {
  let research_area_field = {};
  research_area_field.field = row.field;
  research_area_field.field_text = row.field_text;
  research_area_field.description = row.description;
  research_area_field.discipline = row.discipline;

  return research_area_field;
}

function buildResearchArea(row) {
  let research_area = {};
  research_area.area_id = row.area_id;
  research_area.title = row.title;

  return research_area;
}

function buildMember(row) {
  let member = {};
  member.scid = row.scid;

  return member;
}

function buildCourse(row) {
  let course = {};
  course.course_id = row.course_id;
  course.course_number = row.course_number;
  course.long_title = row.long_title;

  return course;
}

function queryResearchAreas(args) {
  return Db.query(`
    SELECT Field.field, Field.field_text, Field.description, Field.discipline, 
          Areas.area_id, Areas.title,
          Courses.course_id, Courses.course_number, Courses.long_title,
          Members.scid
    FROM       SCS.research_field_discipline as Field 
    INNER JOIN SCS.research_area_field ON Field.field = SCS.research_area_field.field
    INNER JOIN SCS.research_areas as Areas ON Areas.area_id = SCS.research_area_field.area_id 
    INNER JOIN SCS.research_members as Members ON Members.area_id = Areas.area_id 
    INNER JOIN SCS.research_courses as Courses ON Courses.area_id = Areas.area_id 
    WHERE Field.field = $field`,
    { bind: { field: args.field }}).then(data => {
      const data_length = data[0].length;
      let results = [];

      if (data_length > 0) {
        results[0] = buildResearchAreaField(data[0][0]);

        for (let i = 0; i < data_length; i++) {
          if (results[0].areas) {
            if (!results[0].areas[data[0][i].area_id])
              results[0].areas[data[0][i].area_id] = buildResearchArea(data[0][i]);
          }
          else {
            results[0].areas = [];
            results[0].areas[data[0][i].area_id] = buildResearchArea(data[0][i]);
          } 
          
          if (results[0].courses) {
            if (!results[0].courses[data[0][i].course_id])
              results[0].courses[data[0][i].course_id] = buildCourse(data[0][i]);
          }
          else {
            results[0].courses = [];
            results[0].courses[data[0][i].course_id] = buildCourse(data[0][i]);
          } 

          if (results[0].members) {
            if (!results[0].members[data[0][i].scid])
              results[0].members[data[0][i].scid] = buildMember(data[0][i]);
          }
          else {
            results[0].members = [];
            results[0].members[data[0][i].scid] = buildMember(data[0][i]);
          } 
        }

        let areas = [];
        for (const area in results[0].areas) {
          areas.push(results[0].areas[area]);
        }

        let members = [];
        for (const member in results[0].members) {
          members.push(results[0].members[member]);
        }

        let courses = [];
        for (const course in results[0].courses) {
          courses.push(results[0].courses[course]);
        }

        results[0].areas = areas;
        results[0].members = members;
        results[0].courses = courses;
      }

      return results;
    });
}

export default {
  type: new GraphQLList(ResearchAreaFieldsType),
  description: 'List of Research Areas',
  args: {
    field: { type: GraphQLString }
  },
  resolve: function (obj, args) {
    if (args && args.field) {
      return queryResearchAreas(args);
    } else {
      return null;
    }
  }
}

