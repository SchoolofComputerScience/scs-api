import {
  GraphQLList,
  GraphQLString
} from 'graphql'

import { NewsType } from '../types/news'
import { getNewsWithSearch } from '../data/news'

export default {
  type: new GraphQLList(NewsType),
  args: {
    query: { type: GraphQLString }
  },
  description: 'List of news articles associated to a query',
  resolve: function(parent, args){
    return getNewsWithSearch(args.query);
  }
}
