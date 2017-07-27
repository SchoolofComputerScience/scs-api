import {
  GraphQLList,
  GraphQLString
} from 'graphql'

import { CourseListType } from '../types/courses'
import CoursesData from '../data/courses.js'

export default {
  type: new GraphQLList(CourseListType),
  description: 'course listing',
  args: {
    courseNumber: { type: GraphQLString },
    s3Department: { type: GraphQLString },
    semesterCode: { type: GraphQLString }
  },
  resolve: function(parent, args){
    let semCode = args.semesterCode || "S17"
    return CoursesData.find({
      semesterCode: `${semCode}`
    })
    .catch(err => err)
  }
}
