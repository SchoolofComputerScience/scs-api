// import * as graphql from 'graphql';
// import data from './data.js';

import {
	GraphQLObjectType,
	GraphQLSchema
} from 'graphql';

// import directory from './types/directory.js'
// import Member from './types/directory.js';

import queries from './queries'

let queryType = new GraphQLObjectType({
  name: 'Query',
  description: 'SCS top level data points',
  fields: queries
  // {
  //   directory: {
  //     type: new graphql.GraphQLList(memberType),
  //     description: 'Directory listing of SCS, sortable by name / department.',
  //     args: {
  //       scid: { type: graphql.GraphQLString  },
  //       department: { type: graphql.GraphQLString  },
  //       starts_with: { type: graphql.GraphQLString  },
  //       research_area: { type: graphql.GraphQLString  },
  //       sortBy: { type: graphql.GraphQLString }
  //     },
  //     resolve: function(_, args) {
  //       if(args.scid){
  //         return data.directory().find({'scid': args.scid}).then((data) => data)
  //       }else if(args.department){
  //         return data.directory().find({'positions': {$elemMatch: {'department': args.department }}})
  //           .then((data) => data)
  //           .catch(err => err)
  //
  //       }else if(args.research_area){
  //         return data.directory().find({'research_areas': {$elemMatch: {'area_id': args.research_area }}})
  //           .then((data) => data)
  //           .catch(err => err)
  //       }else{
  //         if(args.sortBy == 'family_name'){
  //           return data.directory().find({}).sort({ family_name: 1}).then(data => data)
  //         }else{
  //           return data.directory().find({}).sort({scid: 1}).then(data => data)
  //         }
  //       }
  //     }
  //   }
  // }
})

export const ScsApiSchema = new GraphQLSchema({
  query: queryType
});
