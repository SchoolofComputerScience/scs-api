import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString
} from 'graphql';

export const EventsType = new GraphQLObjectType({
  name: 'Events',
  description: 'Events feed from Prismic.io',
  fields: () => ({
    id: { type: GraphQLString },
    room: { type: GraphQLString },
    building: { type: GraphQLString },
    name: { type: GraphQLString },
    date: { type: GraphQLString },
    speakerName: { type: GraphQLString },
    description: { type: GraphQLString },
    // type: { type: GraphQLString },
    // tags: { type: new GraphQLList(GraphQLString) },
    eventUrl: { type: GraphQLString }
    // poster: { type: GraphQLString },
    // posterText: { type: GraphQLString }
  })
})
