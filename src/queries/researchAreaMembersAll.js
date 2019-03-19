import {
  GraphQLList,
  GraphQLString
} from 'graphql';
import Db from '../db';

import { ResearchMemberType } from '../types/member';

const ResearchAreaMembers = Db.models['research_members'];
const Members = Db.models['directory'];
const ResearchAreaField = Db.models['research_area_field'];

function buildResearchArea(row) {
  let research_area = {};
  research_area.area_id = row["member_research_areas.area_id"];
  research_area.title = row["member_research_areas.area_text"];

  return research_area;
}

function buildMember(row) {
  let member = {};
  member.andrew_id = row["research_area_members.andrew_id"];
  member.biography = row["research_area_members.biography"];
  member.display_email = row["research_area_members.display_email"];
  member.display_name = row["research_area_members.display_name"];
  member.email = row["research_area_members.email"];
  member.family_name = row["research_area_members.family_name"];
  member.fax_phone = row["research_area_members.fax_phone"];
  member.given_name = row["research_area_members.given_name"];
  member.homepage_url = row["research_area_members.homepage_url"];
  member.hr_relationship = row["research_area_members.hr_relationship"];
  member.hr_relationship_class = row["research_area_members.hr_relationship_class"];
  member.hr_relationship_desc = row["research_area_members.hr_relationship_desc"];
  member.image_url = row["research_area_members.image_url"];
  member.is_alum = row["research_area_members.is_alum"];
  member.middle_name = row["research_area_members.middle_name"];
  member.name_suffix = row["research_area_members.name_suffix"];
  member.phone_area_code = row["research_area_members.phone_area_code"];
  member.phone_area_code_secondary = row["research_area_members.phone_area_code_secondary"];
  member.phone_exchange = row["research_area_members.phone_exchange"];
  member.phone_extension = row["research_area_members.phone_extension"];
  member.phone_extension_secondary = row["research_area_members.phone_extension_secondary"];
  member.scid = row["research_area_members.scid"];
  member.scs_id = row["research_area_members.scs_id"];
  member.scs_email = row["research_area_members.scs_email"];
  member.scs_relationship_class = row["research_area_members.scs_relationship_class"];
  member.scs_relationship_subclass = row["research_area_members.scs_relationship_subclass"];
  member.scs_relationship_desc = row["research_area_members.scs_relationship_desc"];

  return member;
}

function queryResearchAreaMembers(args) {
  let query_options = {
    raw: true,
    include: [{
      model: ResearchAreaField,
      as: 'member_research_areas',
      required: true
    },
    {
      model: Members,
      as: 'research_area_members',
      required: true
    }]
  }

  return ResearchAreaMembers.findAll(query_options).then(data => {
    const data_length = data.length;
    let results = [];

    for (let i = 0; i < data_length; i++) {
      if (results[data[i].scid]) {
        results[data[i].scid].research_areas.push(buildResearchArea(data[i]));
      }
      else {
        let data_row = buildMember(data[i]);
        data_row.research_areas = [];
        data_row.research_areas.push(buildResearchArea(data[i]));

        results[data[i].scid] = data_row;
      }
    }

    let members = [];
    for (const member in results) {
      members.push(results[member]);
    }

    return members;
  });
}

export default {
  type: new GraphQLList(ResearchMemberType),
  description: 'List of Members For an Area',
  resolve: function (parent, args) {
    return queryResearchAreaMembers();
  }
}

