import {
  GraphQLList,
  GraphQLString
} from 'graphql';
import Db from './../db';

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
  position.room_id = row["positions.room_id"];
  position.scs_position_class = row["positions.scs_position_class"];
  position.scs_position_desc = row["positions.scs_position_desc"];
  position.title = row["positions.title"];

  return position;
}

function buildPublication(row) {
  let publication = {};
  publication.authors = row["gs_publications.authors"];
  publication.description = row["gs_publications.description"];
  publication.gs_citation_count = row["gs_publications.gs_citation_count"];
  publication.gs_citation_guid = row["gs_publications.gs_citation_guid"];
  publication.gs_citation_url = row["gs_publications.gs_citation_url"];
  publication.gs_profile_guid = row["gs_publications.gs_profile_guid"];
  publication.pages = row["gs_publications.pages"];
  publication.pub_date = row["gs_publications.pub_date"];
  publication.pub_format = row["gs_publications.pub_format"];
  publication.pub_url = row["gs_publications.pub_url"];
  publication.pub_year = row["gs_publications.pub_year"];
  publication.publisher = row["gs_publications.publisher"];
  publication.title = row["gs_publications.title"];
  publication.scid = row["gs_publications.scid"];

  return publication;
}

function buildGSProfile(row) {
  let profile = {};
  profile.authors = row["gs_profiles.authors"];
  profile.gs_affiliation = row["gs_profiles.gs_affiliation"];
  profile.gs_citation_count = row["gs_profiles.gs_citation_count"];
  profile.gs_fullname = row["gs_profiles.gs_fullname"];
  profile.gs_citation_url = row["gs_profiles.gs_citation_url"];
  profile.gs_profile_guid = row["gs_profiles.gs_profile_guid"];
  profile.gs_hindex = row["gs_profiles.gs_hindex"];
  profile.gs_hindex_five_year = row["gs_profiles.gs_hindex_five_year"];
  profile.gs_homepage_url = row["gs_profiles.gs_homepage_url"];
  profile.gs_i10index = row["gs_profiles.gs_i10index"];
  profile.gs_i10index_five_year = row["gs_profiles.gs_i10index_five_year"];
  profile.gs_image_url = row["gs_profiles.gs_image_url"];
  profile.gs_areas = row["gs_profiles.gs_areas"];
  profile.scid = row["gs_profiles.scid"];
  profile.gs_citation_count_five_year = row["gs_profiles.gs_citation_count_five_year"];

  return profile;
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
  let query_options = {
    raw: true,
    include: [{
      model: Position,
      as: 'positions'
    }],
    order: [['family_name', 'ASC']]
  }

  if (args.scid) {
    query_options.where = { scid: args.scid };
  } else if (args.andrew_id) {
    query_options.where = { andrew_id: args.andrew_id };
  } else if (args.department) {
    query_options.where = { department: args.department };
  }

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
    }

    let members = [];
    for (const result in results) {
      members.push(results[result]);
    }

    return members;
  });
}

export default {
  type: new GraphQLList(MemberType),
  description: 'Directory listing',
  args: {
    scid: { type: GraphQLString },
    andrew_id: { type: GraphQLString },
    department: { type: GraphQLString },
    starts_with: { type: GraphQLString },
    research_area: { type: GraphQLString },
    sortBy: { type: GraphQLString }
  },
  resolve: function(parent, args) {
    if(args.scid) {
      return queryMembers({ scid: args.scid });
    } else if(args.andrew_id) {
      return queryMembers({ andrew_id: args.andrew_id });
    }else if(args.department) {
      return queryMembers({ department: args.department });
    } else {
      return queryMembers();
    }
  }
}
