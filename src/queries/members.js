import {
  GraphQLList,
  GraphQLString
} from 'graphql';
import Db from '../db';

import { MemberType } from '../types/member';

const Member = Db.models['directory'];
const Position = Db.models['positions'];

function buildPosition(row) {
  let position = {};
  position.building_id = row["positions.building_id"];
  position.department = row["positions.department"];
  position.hr_department_id = row["positions.hr_department_id"];
  position.performance_supervisor_scid = row["positions.performance_supervisor_scid"];
  position.primary_position_indicator = row["positions.primary_position_indicator"];
  position.room = row["positions.room"];
  position.scs_position_class = row["positions.scs_position_class"];
  position.scs_position_desc = row["positions.scs_position_desc"];
  position.title = row["positions.title"];

  return position;
}

function buildMember(row) {
  let member = {};
  member.andrew_id = row.andrew_id;
  member.biography = row.biography;
  member.display_email = row.display_email;
  member.display_name = row.display_name;
  member.email = row.email;
  member.family_name = row.family_name;
  member.fax_phone = row.fax_phone;
  member.given_name = row.given_name;
  member.homepage_url = row.homepage_url;
  member.hr_relationship = row.hr_relationship;
  member.hr_relationship_class = row.hr_relationship_class;
  member.hr_relationship_desc = row.hr_relationship_desc;
  member.image_url = row.image_url;
  member.is_alum = row.is_alum;
  member.middle_name = row.middle_name;
  member.name_suffix = row.name_suffix;
  member.phone_area_code = row.phone_area_code;
  member.phone_area_code_secondary = row.phone_area_code_secondary;
  member.phone_exchange = row.phone_exchange;
  member.phone_extension = row.phone_extension;
  member.phone_extension_secondary = row.phone_extension_secondary;
  member.scid = row.scid;
  member.scs_id = row.scs_id;
  member.scs_email = row.scs_email;
  member.scs_relationship_class = row.scs_relationship_class;
  member.scs_relationship_subclass = row.scs_relationship_subclass;
  member.scs_relationship_desc = row.scs_relationship_desc;

  return member;
}

function queryMembers(args) {
  let position_model = {
    model: Position,
    as: 'positions',
    required: true
  };

  if (args && args.department) {
    position_model.where = { hr_department_id: args.department }
  }

  let query_options = {
    raw: true,
    include: [position_model],
    order: [['family_name', 'ASC']]
  }

  let where = {};

  if (args && args.scid) {
    where.scid = args.scid;
  } else if (args && args.andrew_id) {
    where.andrew_id = args.andrew_id;
  }

  query_options.where = where;

  return Member.findAll(query_options).then(data => {
    const data_length = data.length;
    let results = [];

    for (let i = 0; i < data_length; i++) {
      if (results[data[i].scid]) {
        results[data[i].scid].positions.push(buildPosition(data[i]));
      }
      else {
        let data_row = buildMember(data[i]);

        data_row.positions = [];
        data_row.positions.push(buildPosition(data[i]));

        results[data[i].scid] = data_row;
      }

      results[data[i].scid].args = args;
    }

    let final_members = [];
    for (const result in results) {
      final_members.push(results[result]);
    }

    return final_members;
  });
}

export default {
  type: new GraphQLList(MemberType),
  description: 'Directory listing',
  args: {
    scid: { type: GraphQLString },
    andrew_id: { type: GraphQLString },
    department: { type: GraphQLString }
  },
  resolve: function(parent, args) {
    if(args && args.scid) {
      return queryMembers({ scid: args.scid });
    } else if(args && args.andrew_id) {
      return queryMembers({ andrew_id: args.andrew_id });
    } else if(args && args.department) {
      return queryMembers({ department: args.department });
    } else {
      return queryMembers();
    }
  }
}
