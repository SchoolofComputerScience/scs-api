import {
  GraphQLList,
  GraphQLString
} from 'graphql'

import { CourseAggregateStringType } from '../types/courses'
import MembersData from '../data/members'

export default {
  type: new GraphQLList(CourseAggregateStringType),
  description: 'Aggregate over available strings in course fields',
  args: {
    field: { type: GraphQLString }
  },
  resolve: function(parent, args) {
    if(args.field)
      return MembersData.aggregate([
        {$group: { _id : `$${args.field}` }},
        {$sort: { _id: -1 }}
      ]).then((data) => data)
  }
}
