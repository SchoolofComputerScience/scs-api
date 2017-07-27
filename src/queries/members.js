import {
  GraphQLList,
  GraphQLString
} from 'graphql'

import { MemberType } from '../types/member'
import MembersData from '../data/members.js'

export default {
  type: new GraphQLList(MemberType),
  description: 'Directory listing',
  args: {
    scid: { type: GraphQLString },
    department: { type: GraphQLString },
    starts_with: { type: GraphQLString },
    research_area: { type: GraphQLString },
    sortBy: { type: GraphQLString }
  },
  resolve: function(parent, args) {
    if(args.scid){
      return MembersData.find({'scid': args.scid}).then((data) => data)
    }else if(args.department) {
      return MembersData.find({'positions': {$elemMatch: {'department': args.department }}})
        .then((data) => data)
        .catch(err => err)
    }else if(args.research_area) {
      return MembersData.find({'research_areas': {$elemMatch: {'area_id': args.research_area }}})
        .then((data) => data)
        .catch(err => err)
    }else {
      return MembersData.find({}).sort({ family_name: 1}).then(data => data)
    }
  }
}
