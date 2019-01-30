import {
  GraphQLList,
  GraphQLString
} from 'graphql';
import Db from '../db';

import { ResearchAreaType } from '../types/research';
const ResearchAreas = Db.models['research_areas'];

function buildResearchArea(row) {
  let research_area = {};
  research_area.area_id = row.area_id;
  research_area.description = row.description;
  research_area.title = row.title;

  return research_area;
}

function queryResearchAreas(args) {
  let query_options = {};

  if (args && args.area_id) {
    query_options.where = { area_id: args.area_id };
  }

  return ResearchAreas.findAll(query_options).then(data => {
    const data_length = data.length;
    let results = [];

    for (let i = 0; i < data_length; i++) {
      results.push(buildResearchArea(data[i]));

      results[i].args = args;
    }

    return results;
  });
}

export default {
  type: new GraphQLList(ResearchAreaType),
  description: 'List of Research Areas',
  args: {
    area_id: { type: GraphQLString }
  },
  resolve: function (obj, args) {
    if (args && args.area_id) {
      return queryResearchAreas(args);
    } else {
      return queryResearchAreas();
    }
  }
}