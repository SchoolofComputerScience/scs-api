import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt
} from 'graphql';

import PublicationData from '../data/publications.js'

export const PublicationType = new GraphQLObjectType({
  name: 'Publications',
  description: 'Google Scholar Publication',
  args: {
    name: { type: GraphQLString }
  },
  fields: () => ({
    _id: { type: GraphQLString },
    authors: { type: GraphQLString },
    desc: { type: GraphQLString },
    gs_citation_count: { type: GraphQLInt },
    gs_citation_guid: { type: GraphQLString },
    gs_citation_url: { type: GraphQLString },
    gs_profile_guid: { type: GraphQLString },
    journal: { type: GraphQLString },
    pages: { type: GraphQLString },
    pub_date: { type: GraphQLString },
    pub_format: { type: GraphQLString },
    pub_url: { type: GraphQLString },
    pub_year: { type: GraphQLInt },
    publisher: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    title: { type: GraphQLString },
    scid: { type: GraphQLString },
  })
})

export const ProfileType = new GraphQLObjectType({
  name: 'GoogleScholarProfile',
  description: 'Google Scholar Profile',
  args: {
    name: { type: GraphQLString }
  },
  fields: () => ({
    _id: { type: GraphQLString },
    authors: { type: GraphQLString },
    scid: { type: GraphQLString },
    gs_affiliation: { type: GraphQLString },
    gs_areas: { type: GraphQLString },
    gs_citation_count: { type: GraphQLInt },
    gs_citation_count_five_year: { type: GraphQLInt },
    gs_fullname: { type: GraphQLString },
    gs_hindex: { type: GraphQLInt },
    gs_hindex_five_year: { type: GraphQLInt },
    gs_homepage_url: { type: GraphQLString },
    gs_i10index: { type: GraphQLInt },
    gs_i10index_five_year: { type: GraphQLInt },
    gs_image_url: { type: GraphQLString },
    gs_profile_guid: { type: GraphQLString },
    gs_profile_url: { type: GraphQLString },
    pub_year_agg: {
      type: new GraphQLList(PublicationYearAggregation),
      resolve: function(args){
        if(args.scid)
          return PublicationData.aggregate([
            {$match: { scid : `${args.scid}`, pub_year:{ $ne: null}} },
            {$group: { _id: '$pub_year'}},
            {$sort: {'_id' :-1}}
          ])
      }
    }
  })
})

export const PublicationYearAggregation = new GraphQLObjectType({
  name: 'Aggregate',
  description: 'Aggregation of fields',
  fields: () => ({
    _id: { type: GraphQLString }
  })
})
