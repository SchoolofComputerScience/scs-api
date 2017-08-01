import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} from 'graphql';

const ProgramAreaType = new GraphQLObjectType({
  name: 'ResearchAreaOfPrograms',
  description: 'Research Area From Programs Collection',
  fields: () => ({
    title: { type: GraphQLString },
    area_id: { type: GraphQLString }
  })
});

const ProgramAreasType = new GraphQLObjectType({
  name: 'ResearchAreasOfPrograms',
  description: 'List of Research Areas From Programs Collection',
  fields: () => ({
    track_id: { type: GraphQLString },
    areas: { type: new GraphQLList(ProgramAreaType) }
  })
});

const ProgramGoalsType = new GraphQLObjectType({
  name: 'GoalsOfPrograms',
  description: 'List of Goals For Research Track For A Programs',
  fields: () => ({
    track_id: { type: GraphQLString },
    goal: { type: GraphQLString }
  })
});

const ProgramOutcomesType = new GraphQLObjectType({
  name: 'OutcomesOfPrograms',
  description: 'List of Learning Outcomes For Research Areas For A Programs',
  fields: () => ({
    track_id: { type: GraphQLString },
    outcomes: { type: new GraphQLList(GraphQLString) }
  })
});

export const ProgramType = new GraphQLObjectType({
  name: 'Programs',
  description: 'List of Programs',
  fields: () => ({
    program_id: { type: GraphQLString },
    program_name: { type: GraphQLString },
    url: { type: GraphQLString },
    description: { type: GraphQLString },
    department: { type: new GraphQLList(GraphQLString) },
    graduate_level: { type: GraphQLString },
    degree_level: { type: GraphQLString },
    additional_degree: { type: GraphQLBoolean },
    areas: { type: new GraphQLList(ProgramAreasType) },
    goals: { type: new GraphQLList(ProgramGoalsType) },
    learning_outcomes: { type: new GraphQLList(ProgramOutcomesType) }
  })
});
