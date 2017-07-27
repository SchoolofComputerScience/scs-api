import {
  GraphQLList,
  GraphQLInt
} from 'graphql'

import { EventsType } from '../types/events'
import { getEvents } from '../data/events'

export default {
  type: new GraphQLList(EventsType),
  description: 'List of Events',
  args: {
    limit: { type: GraphQLInt }
  },
  resolve: function(_,args){
    let events = []
    let _limit = args.limit || 20;
    return getEvents(_limit)
      .then((res) => {
        res.map((item) => {
          if(item.data['events.starttime']) {
            events.push(item)
          }
        })
        return events;
      })
      .catch(err => err)
  }
}
