import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLFloat
} from 'graphql';

export const ResearchAreasType = new GraphQLObjectType({
  name: 'ResearchAreas',
  description: 'List of Research Areas',
  fields: () => ({
    area_id: { type: GraphQLString },
    description: { type: GraphQLString },
    title: { type: GraphQLString },
    gs_count: { type: GraphQLFloat },
    members: { type: new GraphQLList(GraphQLString) },
  })
})
