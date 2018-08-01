import {
  GraphQLList,
  GraphQLString
} from 'graphql'

import { DepartmentsType } from '../types/departments'
import DepartmentsData from '../models/departments.js'

export default {
  type: new GraphQLList(DepartmentsType),
  args: {
    college_id: { type: GraphQLString }
  },
  description: 'List of Departments',
  resolve: function(parent, args){
    if (args.college_id)
      return DepartmentsData
        .find({
          college_id: `${args.college_id}`
        })
        .then(data => data)
        .catch(err =>  err)
    else
      return DepartmentsData
        .find({})
        .then(data => data)
        .catch(err =>  err)
  }
}
