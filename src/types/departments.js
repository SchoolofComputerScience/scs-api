import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

export const DepartmentsType = new GraphQLObjectType({
  name: 'Departments',
  description: 'List of Departments',
  fields: () => ({
    department_id: { type: GraphQLString },
    department_name: { type: GraphQLString },
    college_id: { type: GraphQLString },
    college_name: { type: GraphQLString },
    scs_relationship: { type: GraphQLString },
    scs_type: { type: GraphQLString },
    cmu_type: { type: GraphQLString },
    url: { type: GraphQLString }
  })
});
