import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql';

import { FieldCounts } from './utils'
import { EventsType } from './events'
import { NewsType } from './news'

import CoursesData from '../models/courses'
import MemberData from '../models/members'
import ProgramsData from '../models/programs'
import { getEventsWithTag } from '../models/events'
import { getNewsWithTag } from '../models/news'

export const DepartmentContentType = new GraphQLObjectType({
  name: 'DepartmentInfo',
  description: 'Department content information from Prismic.io',
  arg: {
    newsCount: { type: GraphQLInt },
    eventsCount: { type: GraphQLInt }
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
    },
    programs_count: {
      type: FieldCounts,
      resolve: function(parent, args) {
        return ProgramsData.count({ 'department':`${parent.uid}` })
          .then(res => res)
          .catch(err => err)
      }
    },
    member_count: {
      type: FieldCounts,
      resolve: function(parent, args) {
        return MemberData.count({'positions': {$elemMatch: {'department': `${parent.uid}`}}})
          .then(res => res)
          .catch(err => err)
      }
    },
    course_count: {
      type: FieldCounts,
      args: {
        semesterCode: { type: GraphQLString }
      },
      resolve: function(parent, args) {
        return CoursesData.count({semester_code: `${args.semesterCode}`, department: `${parent.uid}`})
          .then(res => res)
          .catch(err => err)
      }
    },
    events: {
      type: new GraphQLList(EventsType),
      args: {
        limit: { type: GraphQLInt }
      },
      resolve: function(parent, args) {
        return getEventsWithTag(parent.uid.toUpperCase(), args)
          .then(res => res)
          .catch(err => err)
      }
    },
    news: {
      type: new GraphQLList(NewsType),
      args: {
        limit: { type: GraphQLInt }
      },
      resolve: function(parent, args) {
        return getNewsWithTag(parent.uid.toUpperCase(), args )
          .then(res => res)
          .catch(err => err)
      }
    },
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
