import { GraphQLString, GraphQLList } from 'graphql'
import { PublicationType } from '../types/publications'

import PublicationData from '../data/publications.js'

export default {
  type: new GraphQLList(PublicationType),
  description: 'Publications',
  args: {
    id: { type: GraphQLString }
  },
  resolve: function(_,args){
    if(args.id) {
      return PublicationData
          .find({'_id': args.id}).then((data) => data)
          .catch(err => err);
    }else{
      return PublicationData
        .find({}).then((data) => data)
        .catch(err => err);
    }
  }
}
