import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

export const DepartmentContentType = new GraphQLObjectType({
  name: 'DepartmentInfo',
  description: 'Department content information from Prismic.io',
  arg: {
    uid: { type: GraphQLString }
  },
  fields: () => ({
    uid: {
      type: GraphQLString,
      resolve: (parent, args) => parent.uid
    },
    name: {
      type: GraphQLString,
      resolve: (parent, args) => parent.data['departments.name'].value[0].text
    },
    description: {
      type: GraphQLString,
      resolve: (parent, args) => parent.data['departments.description'].value[0].text
    },
    short_description: {
      type: GraphQLString,
      resolve: (parent, args) => parent.data['departments.short_description'].value[0].text
    },
    mainimg: {
      type: GraphQLString,
      resolve: (parent, args) => parent.data['departments.mainimg'].value.main.url
    },
    logo: {
      type: GraphQLString,
      resolve: (parent, args) => parent.data['departments.logo'] ? parent.data['departments.logo'].value.main.url : ''
    },
    url: {
      type: GraphQLString,
      resolve: (parent, args) => parent.data['departments.url'].value.url
    }
  })
})

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
