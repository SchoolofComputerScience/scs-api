import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';


export const ResearchAreasCourseType = new GraphQLObjectType({
  name: 'ResearchAreasCourse',
  description: 'Course that has an association with an area',
  fields: () => ({
    course_id: { type: GraphQLString },
    course_number: { type: GraphQLString },
    title: { type: GraphQLString }
  })
});