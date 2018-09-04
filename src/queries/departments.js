import { GraphQLList, GraphQLString } from 'graphql';
import Db from '../db';

import { DepartmentsType } from '../types/departments';
const Departments = Db.models['departments'];

function buildDepartment(row) {
  let department = {};
  department.department_id = row.dept_id;
  department.college_id = row.college_id;
  department.department_name = row.dept_name;
  department.college_name = row.college_name;
  department.url = row.dept_url;
  department.scs_relationship = row.gs_hindex;
  department.scs_type = row.scs_type;
  department.cmu_type = row.cmu_type;

  return department;
}

function queryDepartments(args) {
  let query_options = {};

  if (args && args.college_id) {
    query_options.where = { college_id: args.college_id };
  }

  return Departments.findAll(query_options).then(data => {
    const data_length = data.length;
    let results = [];

    for (let i = 0; i < data_length; i++) {
      results.push(buildDepartment(data[i]));
    }

    return results;
  });
}

export default {
  type: new GraphQLList(DepartmentsType),
  args: {
    college_id: { type: GraphQLString }
  },
  description: 'List Of Departments',
  resolve: function(parent, args) { 
    return queryDepartments(args); 
  }
}


