import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import MembersData from '../data/members'

export const TagScids = new GraphQLObjectType({
  name: 'TagScids',
  description: 'Tag to Scids',
  fields: (parent, args) => ({
    name: {
      type: GraphQLString,
      resolve: (parent, args) => {
        if(parent.includes('_')) {
          return MembersData.findOne({'scid': parent})
            .then((data) => {
              if(data !== null)
                return data.display_name
              else
                return ''
            })
            .catch(err => err)
        }else{
          return parent
        }
      }
    },
    tag: {
      type: GraphQLString,
      resolve: (parent, args) => {
        if(parent.includes('_')) {
          return '/directory/' + parent
        }else{
          return '/departments/' + parent
        }
      }
    }
  })
})
