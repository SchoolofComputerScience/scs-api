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
    course_id: { type: GraphQLString },
  },
  resolve: function(_,args){
    let semCode = args.semester_code || "S17"
    return CoursesData.findOne({
      course_id: `${args.course_id}`
    })
    .catch(err => err)
  }
}
