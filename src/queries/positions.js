import {
  GraphQLList,
  GraphQLString
} from 'graphql';
import Db from './../db';

import { MemberPositionType } from '../types/position';

export default {
  type: new GraphQLList(MemberPositionType),
  description: 'Positions Of Members',
  args: {
    scid: { type: GraphQLString },
  },
  resolve: function (parent, args) {
    if (args.scid) {
      return Db.models['positions'].findAll({ where: { 'scid': args.scid } }).then((data) => data);
    } else {
      return null;
    }
  }
}