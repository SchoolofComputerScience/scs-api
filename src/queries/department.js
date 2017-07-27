import {
  GraphQLList,
  GraphQLString
} from 'graphql'

import { DepartmentContentType } from '../types/departments'
import { getDepartmentWithId } from '../data/departmentContent'

export default {
  type: DepartmentContentType,
  description: 'Single department content from Prismic',
  args:{
    uid: { type : GraphQLString }
  },
  resolve: (parent, args) => {
    return getDepartmentWithId(args.uid)
    .then((res, err) => {
      return res[0].results
    })
    .catch(err => err)
  }
}
