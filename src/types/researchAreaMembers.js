import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

export const ResearchAreasMemberType = new GraphQLObjectType({
  name: 'ResearchAreasMember',
  description: 'Member of each area',
  fields: () => ({
    scid: { type: GraphQLString },
    display_name: { type: GraphQLString }
  })
});