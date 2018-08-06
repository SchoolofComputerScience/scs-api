import {
  GraphQLList,
  GraphQLString
} from 'graphql';
import Db from './../db';

import { ResearchAreasMemberType } from '../types/researchAreaMembers';

const ResearchAreaMembers = Db.models['research_members'];
const Members = Db.models['directory'];

function buildResearchAreaMember(row) {
  let research_area_member = {};
  if (row['research_area_members.display_name']) {
    research_area_member.scid = row.scid;
    research_area_member.display_name = row['research_area_members.display_name'];

    return research_area_member;  
  }
  else {
    return false;
  }
}

function queryResearchAreaMembers(args) {
  let query_options = {
    raw: true,
    include: [{
      model: Members,
      as: 'research_area_members'
    }],
    required: true
  }

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
  type: new GraphQLList(ResearchAreasMemberType),
  description: 'List of Members For an Area',
  args: {
    area_id: { type: GraphQLString }
  },
  resolve: function (args) {
    if (args && args.area_id) {
      return queryResearchAreaMembers(args);
    }
  }
}

