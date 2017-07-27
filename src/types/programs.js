import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} from 'graphql';

export const ProgramType = new GraphQLObjectType({
  name: 'Programs',
  description: 'List of Programs',
  fields: () => ({
    program_id: { type: GraphQLString },
    program_name: { type: GraphQLString },
    url: { type: GraphQLString },
    description: { type: GraphQLString },
    department: { type: new GraphQLList(GraphQLString) },
    graduate_level: { type: GraphQLString },
    degree_level: { type: GraphQLString },
    additional_degree: { type: GraphQLBoolean }
  })
});
