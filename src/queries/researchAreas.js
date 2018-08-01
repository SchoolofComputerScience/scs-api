import {
  GraphQLList,
  GraphQLString
} from 'graphql'

import { ResearchAreasType } from '../types/research'

import ResearchData from '../models/research.js'

export default {
  type: new GraphQLList(ResearchAreasType),
  args: {
    area: { type: GraphQLString },
    title: { type: GraphQLString }
  },
  description: 'List of research areas',
  resolve: function(parent, args){
    if (args.area)
      return ResearchData.find({area_id: `${args.area}`})
        .then((data) => data)
        .catch(err =>  err);
    else if (args.title)
      return ResearchData.find({title: `${args.title}`})
        .then((data) => data)
        .catch(err =>  err);
    else
      return ResearchData.find({})
        .then((data) => data)
        .catch(err =>  err);
  }
}
