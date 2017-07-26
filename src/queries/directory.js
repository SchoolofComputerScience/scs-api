import { GraphQLList, GraphQLString } from 'graphql'
import { MemberType } from '../types/directory'
import data from '../data'

export default {
	type: new GraphQLList(MemberType),
  description: 'Directory listing of SCS, sortable by name / department.',
  args: {
    scid: { type: GraphQLString },
    department: { type: GraphQLString },
    starts_with: { type: GraphQLString },
    research_area: { type: GraphQLString },
    sortBy: { type: GraphQLString }
  },
  resolve: function(_, args) {
    if(args.scid){
      return data.directory().find({'scid': args.scid}).then((data) => data)
    }else if(args.department){
      return data.directory().find({'positions': {$elemMatch: {'department': args.department }}})
        .then((data) => data)
				.catch(err => err)
    }else if(args.research_area){
      return data.directory().find({'research_areas': {$elemMatch: {'area_id': args.research_area }}})
        .then((data) => data)
        .catch(err => err)
    }else{
      if(args.sortBy == 'family_name'){
        return data.directory().find({}).sort({ family_name: 1}).then(data => data)
      }else{
        return data.directory().find({}).sort({scid: 1}).then(data => data)
      }
    }
  }
}
