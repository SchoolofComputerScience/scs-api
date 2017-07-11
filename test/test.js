// var path = require("path");
var envPath = __dirname + "/../.env";
require('dotenv').config({path:envPath});
import { ScsApiSchema } from '../scheme.js';
import { graphql } from 'graphql';

var apiUri = process.env.API_URI;

var assert = require('assert');
describe('SCS API Query Tests', () => {
  describe('Basic Queries', () => {
    it('First query', async () => {
        var program_id = "masters_cs";
        var query = `
            query ProgramsQuery {
                programs (program_id: "${program_id}") {
                    program_id
                    program_name
                    url
                    description
                    department
                    graduate_level
                    degree_level
                    additional_degree
                }
            }
        `;
        var result = await graphql(ScsApiSchema, query)
            .then((data) => data)
            .catch((err) => err);
        assert(result.data.programs[0].program_id == program_id);

    });
  });
});
