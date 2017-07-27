import {
	GraphQLObjectType,
	GraphQLSchema
} from 'graphql'

import queries from './queries'

export const ScsApiSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'SCS top level data points',
    fields: queries
  })
})
