import {
  GraphQLList,
  GraphQLString
} from 'graphql'

import { DepartmentContentType } from '../types/departments'
import { getDepartments } from '../data/departmentContent'

export default {
  type: new GraphQLList(DepartmentContentType),
  description: 'Department content from Prismic',
  resolve: (parent, args) => {
    return getDepartments()
      .then((res, err) => {
        return res[0].results
      })
      .catch(err => err)
  }
}
