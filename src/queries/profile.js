import {
  GraphQLList,
  GraphQLString
} from 'graphql';
import Db from './../db';

import { ProfileType } from '../types/publications';
const Profile = Db.models['gs_profiles'];

function buildGSProfile(row) {
  let profile = {};
  profile.gs_affiliation = row.gs_affiliation;
  profile.gs_citation_count = row.gs_citation_count;
  profile.gs_fullname = row.gs_fullname;
  profile.gs_citation_url = row.gs_citation_url;
  profile.gs_profile_guid = row.gs_profile_guid;
  profile.gs_hindex = row.gs_hindex;
  profile.gs_hindex_five_year = row.gs_hindex_five_year;
  profile.gs_homepage_url = row.gs_homepage_url;
  profile.gs_i10index = row.gs_i10index;
  profile.gs_i10index_five_year = row.gs_i10index_five_year;
  profile.gs_image_url = row.gs_image_url;
  profile.gs_areas = row.gs_areas;
  profile.gs_citation_count_five_year = row.gs_citation_count_five_year;
  profile.scid = row.scid;

  return profile;
}

function queryProfiles(args) {
  let query_options = {};

  if (args && args.scid) {
    query_options.where = { scid: args.scid };
  }

  return Profile.findAll(query_options).then(data => {
    const data_length = data.length;
    let results = [];

    for (let i = 0; i < data_length; i++) {
      results.push(buildGSProfile(data[i]));
    }

    return results;
  });
}

export default {
  type: new GraphQLList(ProfileType),
  description: 'Google Scholar Profiles',
  args: {
    scid: { type: GraphQLString }
  },
  resolve: function (args) {
    if (args && args.scid) {
      return queryProfiles(args);
    } else {
      return queryProfiles();
    }
  }
}
