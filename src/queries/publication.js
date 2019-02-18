import {
  GraphQLList,
  GraphQLString
} from 'graphql'

import { PublicationType } from '../types/publications'
import PublicationData from '../models/publications.js'

export default {
  type: PublicationType,
  description: 'Single Publication',
  args: {
    id: { type: GraphQLString }
  },
  resolve: function(_,args){
    return PublicationData
      .findById(args.id)
      .catch(err => err)
  }
}
