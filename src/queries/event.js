import {
  GraphQLList,
  GraphQLString
} from 'graphql'

import { EventsType } from '../types/events'
import { getEventsWithId } from '../models/events'

export default {
  type: new GraphQLList(EventsType),
  description: 'Individual Event',
  args: {
    uid: { type: GraphQLString }
  },
  resolve: function(_,args){
    return getEventsWithId(args.uid)
      .then((res, err) => {
        if(res[0].results.length !== 0)
          return res[0].results
      })
      .catch(err => err)
  }
}
