import {
  GraphQLList,
  GraphQLString
} from 'graphql'

import { BiographiesType } from '../types/member'
import BiographiesData from '../data/biographies.js'

export default {
  type: new GraphQLList(BiographiesType),
  description: 'Information from department sites including bios, photo url, published email, etc.',
  args: {
    scid: { type: GraphQLString },
  },
  resolve: function(parent, args){
    if(args.scid){
      return BiographiesData.find({'scid': args.scid}).then((data) => data)
    }else{
      return BiographiesData.find({}).sort({scid: 1}).then((data) => data)
    }
  }
}
