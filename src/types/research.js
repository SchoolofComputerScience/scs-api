import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLFloat
} from 'graphql';

import { ResearchAreasCourseType } from '../types/researchAreaCourses';
import { ResearchAreasMemberType } from '../types/researchAreaMembers';
import ResearchCoursesQuery from '../queries/researchAreaCourses'
import ResearchMembersQuery from '../queries/researchAreaMembers'

const ResearchAreasDescriptionSourceType = new GraphQLObjectType({
  name: 'ResearchAreasDescriptionSource',
  description: 'Source metadata for a description of an area',
  fields: () => ({
    title: { type: GraphQLString },
    url: { type: GraphQLString }
  })
});

const ResearchAreasDescriptionType = new GraphQLObjectType({
  name: 'ResearchAreasDescription',
  description: 'Description for areas',
  fields: () => ({
    contributors: { type: new GraphQLList(GraphQLString) },
    sources: { type: new GraphQLList(ResearchAreasDescriptionSourceType) },
    text: { type: GraphQLString },
    title: { type: GraphQLString }
  })
});

const ResearchAreasProgramTrackType = new GraphQLObjectType({
  name: 'ResearchAreasProgramTrack',
  description: 'Program track for areas',
  fields: () => ({
    track_id: { type: GraphQLString },
    track_name: { type: GraphQLString }
  })
});

const ResearchAreasProgramType = new GraphQLObjectType({
  name: 'ResearchAreasProgram',
  description: 'Program for areas',
  fields: () => ({
    program_id: { type: GraphQLString },
    program_name: { type: GraphQLString },
    tracks: { type: new GraphQLList(ResearchAreasProgramTrackType) }
  })
});

export const ResearchAreasType = new GraphQLObjectType({
  name: 'ResearchAreas',
  description: 'List of research areas',
  fields: () => ({
    area_id: { type: GraphQLString },
    courses: { 
      type: new GraphQLList(ResearchAreasCourseType),
      resolve: function (area) {
        if (area.args && area.args.area_id) {
          return ResearchCoursesQuery.resolve(area.args);
        }
        else {
          return [];
        } 
      }
    },
    description: { type: GraphQLString },
    title: { type: GraphQLString },
    gs_count: { type: GraphQLFloat },
    members: { 
      type: new GraphQLList(ResearchAreasMemberType),
      resolve: function (area) {
        if (area.args && area.args.area_id) {
          return ResearchMembersQuery.resolve(area.args);
        }
        else {
          return [];
        }
      }
    }
    // programs: { type: new GraphQLList(ResearchAreasProgramType) }
  })
});
