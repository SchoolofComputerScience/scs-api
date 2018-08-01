import {
  GraphQLList,
  GraphQLInt
} from 'graphql'

import { NewsType } from '../types/news'
import { getNews } from '../models/news'

export default {
  type: new GraphQLList(NewsType),
  description: 'List of News',
  args: {
    limit: { type: GraphQLInt }
  },
  resolve: function(parent, args) {
    let _limit = args.limit || 20;
    return getNews(_limit)
      .then(res => res)
      .catch(err => err)
  }
}
