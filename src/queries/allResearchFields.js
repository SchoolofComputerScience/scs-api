import {
  GraphQLList,
  GraphQLString
} from 'graphql';
import Db from '../db';

import { ResearchAreaFieldsType } from '../types/research';
const ResearchAreasFields = Db.models['research_field_discipline'];
const ResearchAreas = Db.models['research_area_field'];

function buildResearchAreaField(row) {
  let research_area_field = {};
  research_area_field.field = row.field;
  research_area_field.field_text = row.field_text;
  research_area_field.description = row.description;
  research_area_field.discipline = row.discipline;

  return research_area_field;
}

function buildResearchArea(row) {
  let research_area = {};
  research_area.area_id = row["research_area_fields.area_id"];
  research_area.title = row["research_area_fields.area_text"];
  research_area.field = row.field;
  research_area.field_text = row.field_text;

  return research_area;
}

function queryResearchFields(args) {
  let query_options = {};

  query_options = {
    raw: true,
    include: [{
      model: ResearchAreas,
      as: 'field_research_areas',
      required: true
    }]
  }

  return ResearchAreasFields.findAll(query_options).then(data => {
    const data_length = data.length;
    let results = [];

    for (let i = 0; i < data_length; i++) {
      if (results[data[i].field]) {
        results[data[i].field].research_areas.push(buildResearchArea(data[i]));
      }
      else {
        let data_row = buildResearchAreaField(data[i]);
        data_row.research_areas = [];
        data_row.research_areas.push(buildResearchArea(data[i]));

        results[data[i].field] = data_row;
      }
    }

    let areas = [];
    for (const area in results) {
      areas.push(results[area]);
    }

    return areas;
  });
}

export default {
  type: new GraphQLList(ResearchAreaFieldsType),
  description: 'List of Research Fields',
  resolve: function (obj, args) {
    return queryResearchFields();
  }
}

