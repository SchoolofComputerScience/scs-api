import { GraphQLString } from 'graphql'
import { PublicationType } from '../types/publications'

import PublicationData from '../data/publications.js'

export default {
  type: PublicationType,
  description: 'publication',
  args: {
    id: { type: GraphQLString }
  },
  resolve: function(_,args){
    return PublicationData
      .findById(args.id)
      .catch(err => err)
  }
}
