import {
  GraphQLList,
  GraphQLString,
  GraphQLInt
} from 'graphql'

import { NewsType } from '../types/news'
import { getNewsWithTag } from '../data/news'

export default {
  type: new GraphQLList(NewsType),
  args: {
    department: { type: GraphQLString },
    limit: { type: GraphQLInt }
  },
  description: 'list of news articles associated to a tag',
  resolve: function(parent, args){
    return getNewsWithTag(args.department, args);
  }
}
