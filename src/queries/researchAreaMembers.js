import {
  GraphQLList,
  GraphQLString
} from 'graphql';
import Db from '../db';

import { MemberResearchType } from '../types/research';

const ResearchAreaMembers = Db.models['research_members'];

function buildResearchAreaMember(row) {
  let research_area_member = {};
  research_area_member.scid = row.scid;
  research_area_member.area_id = row.area_id;

  return research_area_member;
}

function queryResearchAreaMembers(args) {
  let query_options = {};

  if (args && args.area_id) {
    query_options.where = { area_id: args.area_id }
  }

  if (args && args.scid) {
    query_options.where = { scid: args.scid }
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
  type: new GraphQLList(MemberResearchType),
  description: 'List of Members For an Area',
  args: {
    area_id: { type: GraphQLString },
    scid: { type: GraphQLString }
  },
  resolve: function (parent, args) {
    if (args) {
      return queryResearchAreaMembers(args);
    } else {
      return queryResearchAreaMembers();
    }
  }
}

