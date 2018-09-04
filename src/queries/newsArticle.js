import {
  GraphQLList,
  GraphQLInt,
  GraphQLString
} from 'graphql'

import { NewsArticleType } from '../types/news'
import { getNewsWithId } from '../models/news'

export default {
  type: new GraphQLList(NewsArticleType),
  description: 'Individual news article',
  args: {
    uid: { type:GraphQLString },
    article: { type: GraphQLInt }
  },
  resolve: function(_,args){
  return getNewsWithId(args.uid)
    .then((res, err) => {
      if(res[0].results.length !== 0){
        return res
      }
    })
    .catch(err => err)
  }
}
