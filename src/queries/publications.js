<<<<<<< HEAD
import {
  GraphQLList,
  GraphQLString
} from 'graphql';
import Db from '../db';
=======
import { GraphQLString, GraphQLList } from 'graphql'
import { PublicationType } from '../types/publications'
>>>>>>> d392fe1406203be3f3783d5eb6d3334f00563b03

import { PublicationType } from '../types/publications';
const Publications = Db.models['gs_publications'];

function buildGSPublication(row) {
  let publication = {};
  publication.authors = row.authors;
  publication.description = row.description;
  publication.gs_citation_count = row.gs_citation_count;
  publication.gs_citation_guid = row.gs_citation_guid;
  publication.gs_citation_url = row.gs_citation_url;
  publication.gs_profile_guid = row.gs_profile_guid;
  publication.journal = row.journal;
  publication.pages = row.pages;
  publication.pub_date = row.pub_date;
  publication.pub_format = row.pub_format;
  publication.pub_url = row.pub_url;
  publication.pub_year = row.pub_year;
  publication.publisher = row.publisher;
  publication.timestamp = row.timestamp;
  publication.title = row.title;
  publication.scid = row.scid;

  return publication;
}

function queryPublications(args) {
  let query_options = {};

  if (args && args.scid) {
    query_options.where = { scid: args.scid };
  }

  if (args && args.gs_citation_guid) {
    query_options.where = { gs_citation_guid: args.gs_citation_guid };
  }

  return Publications.findAll(query_options).then(data => {
    const data_length = data.length;
    let results = [];

    for (let i = 0; i < data_length; i++) {
      results.push(buildGSPublication(data[i]));
    }

    return results;
  });
}

export default {
  type: new GraphQLList(PublicationType),
  description: 'Google Scholar Publications',
  args: {
    scid: { type: GraphQLString }
  },
  resolve: function (parent, args) {
    if (parent && parent.scid) {
      return queryPublications(parent);
    } else if (args && args.gs_citation_guid) {
      return queryPublications(args);
    } else {
      return queryPublications();
    }
  }
}
