import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLFloat
} from 'graphql';

const ResearchTrackType = new GraphQLObjectType({
  name: 'ResearchTrack',
  description: 'Research Track For Areas',
  fields: () => ({
    track_id: { type: GraphQLString },
    track_name: { type: GraphQLString }
  })
});

const ResearchMemberType = new GraphQLObjectType({
  name: 'ResearchMember',
  description: 'Members Of Each Research Areas',
  fields: () => ({
    scid: { type: GraphQLString },
    display_name: { type: GraphQLString }
  })
});

const ResearchProgramsType = new GraphQLObjectType({
  name: 'ResearchPrograms',
  description: 'Programs for Research Areas',
  fields: () => ({
    program_id: { type: GraphQLString },
    program_name: { type: GraphQLString },
    tracks: { type: new GraphQLList(ResearchTrackType) }
  })
});


export const ResearchAreasType = new GraphQLObjectType({
  name: 'ResearchAreas',
  description: 'List of Research Areas',
  fields: () => ({
    area_id: { type: GraphQLString },
    description: { type: GraphQLString },
    title: { type: GraphQLString },
    gs_count: { type: GraphQLFloat },
    members: { type: new GraphQLList(ResearchMemberType) },
    programs: { type: new GraphQLList(ResearchProgramsType) }
  })
});
