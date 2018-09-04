import {
  GraphQLList,
  GraphQLString
} from 'graphql'

import { CourseAggregateIntType } from '../types/courses'
import CoursesData from '../models/courses.js'

export default {
  type: new GraphQLList(CourseAggregateIntType),
  description: 'Aggregate over available ints in course fields',
  args: {
    field: { type: GraphQLString }
  },
  resolve: function(parent, args) {
    if(args.field)
      return CoursesData.aggregate([
        {$group: { _id : `$${args.field}` }},
        {$sort: { _id: -1 }}
      ]).then((data) => data)
  }
}
