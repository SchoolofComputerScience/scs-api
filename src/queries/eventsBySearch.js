import {
  GraphQLList,
  GraphQLString
} from 'graphql'

import { EventsType } from '../types/events'
import { getEventsWithSearch } from '../data/events'

export default {
  type: new GraphQLList(EventsType),
  args: {
    query: { type: GraphQLString }
  },
  description: 'List of events seached by a query',
  resolve: function(parent, args){
    return getEventsWithSearch(args.query);
  }
}
