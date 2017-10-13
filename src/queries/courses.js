import {
  GraphQLList,
  GraphQLString
} from 'graphql'

import { CoursesType } from '../types/courses'
import CoursesData from '../data/courses.js'

export default {
  type: new GraphQLList(CoursesType),
  description: 'course listing',
  args: {
    course_number: { type: GraphQLString },
    department: { type: GraphQLString },
    semester_code: { type: GraphQLString }
  },
  resolve: function(parent, args){
    let semCode = args.semester_code || "F17"
    return CoursesData.find({
      semester_code: `${semCode}`
    })
    .catch(err => err)
  }
}
