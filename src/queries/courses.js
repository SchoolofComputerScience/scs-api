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
    courseNumber: { type: GraphQLString },
    s3Department: { type: GraphQLString },
    semesterCode: { type: GraphQLString }
  },
  resolve: function(parent, args){
    let semCode = args.semesterCode || "F17"
    return CoursesData.find({
      semesterCode: `${semCode}`
    })
    .catch(err => err)
  }
}
