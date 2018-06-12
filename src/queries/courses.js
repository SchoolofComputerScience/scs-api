// import {
//   GraphQLList,
//   GraphQLString
// } from 'graphql'

// import { CoursesType } from '../types/courses'
// import CoursesData from '../data/courses.js'

// export default {
//   type: new GraphQLList(CoursesType),
//   description: 'course listing',
//   args: {
//     course_number: { type: GraphQLString },
//     department: { type: GraphQLString },
//     semester_code: { type: GraphQLString }
//   },
//   resolve: function(parent, args){
//     let semCode = args.semester_code || "F17"
//     return CoursesData.find({
//       semester_code: `${semCode}`
//     })
//     .catch(err => err)
//   }
// }

import {
  GraphQLList,
  GraphQLString
} from 'graphql';
import Db from './../db';

import { CoursesType } from '../types/courses';

const CoursesBySemester = Db.models['courses_by_semester'];
const CourseSections = Db.models['course_sections'];
const CrossListedCourses = Db.models['cross_listed_courses'];
const ClassMeetings = Db.models['class_meetings'];


function buildCourse(row) {
  let course = {};
  course.course_id = row.course_id;
  course.course_number = row.course_number;
  course.semester_code = row.semester_code;
  course.college = row.college;
  course.department = row.department;
  course.description = row.description;
  course.graduate_level = row.graduate_level;
  course.long_title = row.long_title;
  course.s3_department = row.s3_dept;
  course.title = row.title;
  course.units = row.units;
  course.lecture_distinction = row.lecture_distinction;

  return course;
}

function buildCourseSection(row) {
  let course_section = {};

  course_section.course_number = row.course_number || row["course_sections.course_number"];
  course_section.course_section_id = row.course_section_id || row["course_sections.course_section_id"];
  course_section.delivery_mode = row.delivery_mode || row["course_sections.delivery_mode"];
  course_section.location = row.location || row["course_sections.location"];
  course_section.long_title = row.long_title || row["course_sections.long_title"];
  course_section.presence_required = row.presence_required || row["course_sections.presence_required"];
  course_section.section_type = row.section_type || row["course_sections.section_type"];
  course_section.title = row.title || row["course_sections.title"];
  course_section.section = row.section || row["course_sections.section"];


  return course_section;
}

function buildCrossListedCourse(row) {
  let cross_listed_course = {};
  cross_listed_course.course_number = row.cross_listed_course_number || row["cross_listed_courses.cross_listed_course_number"];
  cross_listed_course.section = row.cross_listed_section || row["cross_listed_courses.cross_listed_section"];
  cross_listed_course.semester_code = row.cross_listed_semester_code || row["cross_listed_courses.cross_listed_semester_code"];

  return cross_listed_course;
}

function buildClassMeeting(row) {
  let class_meeting = {};
  class_meeting.building = row.building_id || row["class_meetings.building_id"];
  class_meeting.days = row.days || row["class_meetings.days"];
  class_meeting.room = row.room || row["class_meetings.room_id"];
  class_meeting.start_time = row.start_time || row["class_meetings.start_time"];
  class_meeting.end_time = row.end_time || row["class_meetings.end_time"];

  return class_meeting;
}

function queryCourses(args) {
  let query_options = {
    raw: true,
    include: [{
      model: CrossListedCourses,
      as: 'cross_listed_courses'
    }],
    required: false
  }

  return CourseSections.findAll(query_options).then(data => {
    const data_length = data.length;
    let results = [];

    for (let i = 0; i < data_length; i++) {
      let cross_listed_course = buildCrossListedCourse(data[i]);
      let has_cross_listing = cross_listed_course.course_number ? true : false;
      if (results[data[i].course_section_id] && has_cross_listing) {
        results[data[i].course_section_id].cross_listed_courses.push(cross_listed_course);
      }
      else {
        let data_row = buildCourseSection(data[i]);

        data_row.cross_listed_courses = [];
        if (has_cross_listing)
          data_row.cross_listed_courses.push(cross_listed_course);

        results[data[i].course_section_id] = data_row;
      }
    }

    return results;

  }).then(course_sections => {
    let query_options = {
      raw: true,
      include: [{
        model: ClassMeetings,
        as: 'class_meetings'
      }],
      required: false
    }

    return CourseSections.findAll(query_options).then(data => {
      const data_length = data.length;

      for (let i = 0; i < data_length; i++) {
        let class_meeting = buildClassMeeting(data[i]);
        let has_class_meeting = class_meeting.building ? true : false;
        if (course_sections[data[i].course_section_id].meetings && has_class_meeting) {
          course_sections[data[i].course_section_id].meetings.push(class_meeting);
        }
        else {
          course_sections[data[i].course_section_id].meetings = [];
          if (has_class_meeting)
            course_sections[data[i].course_section_id].meetings.push(class_meeting);
        }
      }

      return course_sections;
    });
  }).then(course_sections => {
    let query_options = {
      raw: true,
      include: [{
        model: CourseSections,
        as: 'course_sections'
      }],
      required: false,
      order: [['course_number', 'ASC']]
    }

    if (args && args.course_id) {
      query_options.where = { course_id: args.course_id };
      // } else if (args.andrew_id) {
      //   query_options.where = { andrew_id: args.andrew_id };
      // } else if (args.department) {
      //   query_options.where = { department: args.department };
    }

    return CoursesBySemester.findAll(query_options).then(data => {
      const data_length = data.length;
      let results = [];

      for (let i = 0; i < data_length; i++) {
        if (results[data[i].course_id]) {
          if (course_sections[data[i]['course_sections.course_section_id']])
            results[data[i].course_id].sections.push(course_sections[data[i]['course_sections.course_section_id']]);
        }
        else {
          let data_row = buildCourse(data[i]);

          if (course_sections[data[i]['course_sections.course_section_id']]) {
            data_row.sections = [];
            data_row.sections.push(course_sections[data[i]['course_sections.course_section_id']]);
          }

          results[data[i].course_id] = data_row;
        }
      }

      let courses = [];
      for (const result in results) {
        courses.push(results[result]);
      }

      return courses;
    });
  });
}

// function queryCourses(args) {
//   let query_options = {
//     raw: true,
//     include: [{
//       model: CourseSections,
//       as: 'course_sections'
//     }],
//     required: false,
//     order: [['course_number', 'ASC']]
//   }

//   if (args && args.course_id) {
//     query_options.where = { course_id: args.course_id };
//   // } else if (args.andrew_id) {
//   //   query_options.where = { andrew_id: args.andrew_id };
//   // } else if (args.department) {
//   //   query_options.where = { department: args.department };
//   }

//   //return CoursesBySemester.findAll(query_options);

//   return CoursesBySemester.findAll(query_options).then(data => {
//     const data_length = data.length;
//     let results = [];

//     for (let i = 0; i < data_length; i++) {
//       if (results[data[i].course_id]) {
//         if (setions[data[i].course_section_id])
//           results[data[i].course_id].sections.push(setions[data[i].course_section_id]);
//       }
//       else {
//         let data_row = buildCourse(data[i]);

//         if (setions[data[i].course_section_id]) {
//           data_row.sections = [];
//           data_row.sections.push(setions[data[i].course_section_id]);
//         }

//         results[data[i].course_id] = data_row;
//       }
//     }

//     let courses = [];
//     for (const result in results) {
//       courses.push(results[result]);
//     }

//     return courses;
//   });
// }

export default {
  type: new GraphQLList(CoursesType),
  description: 'Courses listing',
  args: {
    course_id: { type: GraphQLString },
  },
  resolve: function (parent, args) {
    if (args.course_id) {
      return queryCourses({ course_id: args.course_id });
    // } else if (args.andrew_id) {
    //   return queryCourses({ andrew_id: args.andrew_id });
    // } else if (args.department) {
    //   return queryCourses({ department: args.department });
    } else {
      return queryCourses();
    }
  }
}
