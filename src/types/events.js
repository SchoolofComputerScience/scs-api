import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString
} from 'graphql';

export const EventsType = new GraphQLObjectType({
  name: 'Events',
  description: 'SCS Events',
  fields: () => ({
    id: { type: GraphQLString },
    room: { type: GraphQLString },
    building: { type: GraphQLString },
    name: { type: GraphQLString },
    start_date: { type: GraphQLString },
    end_date: { type: GraphQLString },
    speakerName: { type: GraphQLString },
    description: { type: GraphQLString },
    // type: { type: GraphQLString },
    // tags: { type: new GraphQLList(GraphQLString) },
    eventUrl: { type: GraphQLString },
    poster_url: { type: GraphQLString },
    poster_text: { type: GraphQLString },
    event_type: { type: GraphQLString }
  })
})
