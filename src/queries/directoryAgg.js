import {
  GraphQLList,
  GraphQLString
} from 'graphql'

import { DirectoryAggregateType } from '../types/member'
import MembersData from '../models/members'

export default {
  type: new GraphQLList(DirectoryAggregateType),
  description: 'Aggregate over available directory fields',
  args: {
    field: { type: GraphQLString }
  },
  resolve: function(parent, args) {
    if(args.field)
      return MembersData.aggregate([
        {$group: { _id : `$${args.field}` }}
      ])
      .then((data) => data)
  }
}
