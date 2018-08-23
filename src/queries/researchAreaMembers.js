import {
  GraphQLList,
  GraphQLString
} from 'graphql';
import Db from '../db';

import { ScidType } from '../types/utils';

const ResearchAreaMembers = Db.models['research_members'];

function buildResearchAreaMember(row) {
  let research_area_member = {};
  research_area_member.scid = row.scid;

  return research_area_member;
}

function queryResearchAreaMembers(args) {
  let query_options = {};

  if (args && args.area_id) {
    query_options.where = { area_id: args.area_id }
  }

  return ResearchAreaMembers.findAll(query_options).then(data => {
    const data_length = data.length;
    let results = [];

    for (let i = 0; i < data_length; i++) {
      let member = buildResearchAreaMember(data[i]);
      if (member) {
        results.push(member);
      }
    }

    return results;
  });
}

export default {
  type: new GraphQLList(ScidType),
  description: 'List of Members For an Area',
  args: {
    area_id: { type: GraphQLString }
  },
  resolve: function (parent, args) {
    if (args && args.area_id) {
      return queryResearchAreaMembers(args);
    }
  }
}

