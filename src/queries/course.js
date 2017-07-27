import {
  GraphQLList,
  GraphQLString
} from 'graphql'

import { CoursesType } from '../types/courses'
import CoursesData from '../data/courses.js'

export default {
  type: CoursesType,
  description: 'Single Course',
  args: {
    courseCode: { type: GraphQLString },
  },
  resolve: function(_,args){
    let semCode = args.semesterCode || "S17"
    return CoursesData.findOne({
      courseCode: `${args.courseCode}`
    })
    .catch(err => err)
  }
}
