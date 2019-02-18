import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLFloat
} from 'graphql';

import { ScidType } from './utils';

const ResearchAreasDescriptionSourceType = new GraphQLObjectType({
  name: 'ResearchAreasDescriptionSource',
  description: 'Source metadata for a description of an area',
  fields: () => ({
    title: { type: GraphQLString },
    url: { type: GraphQLString }
  })
});

const ResearchAreasCourseType = new GraphQLObjectType({
  name: 'ResearchAreasCourseType',
  description: 'Courses For Research Areas',
  fields: () => ({
    course_id: { type: GraphQLString },
    course_number: { type: GraphQLString },
    long_title: { type: GraphQLString }
  })
});

// const ResearchAreasProgramType = new GraphQLObjectType({
//   name: 'ResearchAreasProgram',
//   description: 'Program for areas',
//   fields: () => ({
//     program_id: { type: GraphQLString },
//     program_name: { type: GraphQLString },
//     tracks: { type: new GraphQLList(ResearchAreasProgramTrackType) }
//   })
// });

export const ResearchAreaType = new GraphQLObjectType({
  name: 'ResearchAreas',
  description: 'Research Areas',
  fields: () => ({
    area_id: { type: GraphQLString },
    title: { type: GraphQLString }
  })
});

export const MemberResearchType = new GraphQLObjectType({
  name: 'MemberResearch',
  description: 'Research Areas For Members',
  fields: () => ({
    area_id: { type: GraphQLString },
    scid: { type: GraphQLString }
  })
});

export const ResearchAreaFieldsType = new GraphQLObjectType({
  name: 'ResearchAreaFields',
  description: 'List of Research Area Fields',
  fields: () => ({
    field: { type: GraphQLString },
    field_text: { type: GraphQLString },
    description: { type: GraphQLString },
    discipline: { type: GraphQLString },
    areas: { type: new GraphQLList(ResearchAreaType) },
    courses: { type: new GraphQLList(ResearchAreasCourseType) },
    members: { type: new GraphQLList(ScidType) }
    // programs: { type: new GraphQLList(ResearchAreasProgramType) }
  })
});
