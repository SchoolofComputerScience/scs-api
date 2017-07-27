import {
  GraphQLList,
  GraphQLString
} from 'graphql'

import { ProgramType } from '../types/programs'
import ProgramsData from '../data/programs.js'

export default {
  type: new GraphQLList(ProgramType),
  args: {
    program_id: { type: GraphQLString },
    department: { type: GraphQLString },
    degree_level: { type: GraphQLString },
    graduate_level: { type: GraphQLString }
  },
  description: 'List of Programs',
  resolve: function(_, args){
    let query = {};
    if (args.program_id)
      query.program_id = args.program_id;
    if (args.department)
      query.department = args.department;
    if (args.degree_level)
      query.degree_level = args.degree_level;
    if (args.graduate_level)
      query.graduate_level = args.graduate_level;

    return ProgramsData.find(query)
      .then(data => data)
      .catch(err =>  err)
  }
}
