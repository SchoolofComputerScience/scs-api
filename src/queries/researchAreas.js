// import {
//   GraphQLList,
//   GraphQLString
// } from 'graphql'

// import { ResearchAreasType } from '../types/research'

// import ResearchData from '../models/research.js'

// export default {
//   type: new GraphQLList(ResearchAreasType),
//   args: {
//     area: { type: GraphQLString },
//     title: { type: GraphQLString }
//   },
//   description: 'List of research areas',
//   resolve: function(parent, args){
//     if (args.area)
//       return ResearchData.find({area_id: `${args.area}`})
//         .then((data) => data)
//         .catch(err =>  err);
//     else if (args.title)
//       return ResearchData.find({title: `${args.title}`})
//         .then((data) => data)
//         .catch(err =>  err);
//     else
//       return ResearchData.find({})
//         .then((data) => data)
//         .catch(err =>  err);
//   }
// }

import {
  GraphQLList,
  GraphQLString
} from 'graphql';
import Db from './../db';

import { ResearchAreasType } from '../types/research';
const ResearchAreas = Db.models['research_areas'];

function buildResearchArea(row) {
  let research_area = {};
  research_area.area_id = row.area_id;
  research_area.description = row.description;
  research_area.gs_count = row.gs_count;
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
    }

    return results;
  });
}

export default {
  type: new GraphQLList(ResearchAreasType),
  description: 'List of Research Areas',
  args: {
    area_id: { type: GraphQLString }
  },
  resolve: function (args) {
    if (args && args.area_id) {
      return queryResearchAreas(args);
    } else {
      return queryResearchAreas();
    }
  }
}

