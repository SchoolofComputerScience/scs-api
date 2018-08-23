import {
  GraphQLList,
  GraphQLString
} from 'graphql'
import Db from '../db';

import { ProgramType } from '../types/programs';
const Programs = Db.models['programs'];

function buildPrograms(row) {
  let program = {};
  program.additional_degree = row.additional_degree;
  program.active = row.active;
  program.degree_level = row.degree_level;
  program.description = row.description;
  program.departments = row.department;
  program.url = row.url;
  program.graduate_level = row.graduate_level;
  program.program_id = row.program_id;
  program.program_name = row.program_name;

  return program;
}

function queryPrograms() {
  return Programs.findAll().then(data => {
    const data_length = data.length;
    let results = [];

    for (let i = 0; i < data_length; i++) {
      let program = buildPrograms(data[i]);
      program.departments = program.departments.split(',');
      results.push(program);
    }

    return results;
  });
}

export default {
  type: new GraphQLList(ProgramType),
  args: {
    program_id: { type: GraphQLString },
    department: { type: GraphQLString },
    degree_level: { type: GraphQLString },
    graduate_level: { type: GraphQLString }
  },
  description: 'List Of Programs',
  resolve: function () {
    return queryPrograms();
  }
}


