import {
  GraphQLList,
  GraphQLString
} from 'graphql';
import Db from './../db';

import { MemberType } from '../types/member';

const Member = Db.models['test_directory'];
const Position = Db.models['test_positions'];

export default {
  type: new GraphQLList(MemberType),
  description: 'Directory listing',
  args: {
    scid: { type: GraphQLString },
    andrew_id: { type: GraphQLString },
    department: { type: GraphQLString },
    starts_with: { type: GraphQLString },
    research_area: { type: GraphQLString },
    sortBy: { type: GraphQLString }
  },
  resolve: function(parent, args) {
    if(args.scid) {
      return Member.findAll({ where: { 'scid': args.scid } }).then((data) => data);
    } else if(args.andrew_id) {
      return Member.findAll({ where:{'andrew_id': args.andrew_id}}).then((data) => data);
    // }else if(args.department) {
    //   return MembersData.findAll({'positions': {$elemMatch: {'department': args.department }}})
    //     .then((data) => data)
    //     .catch(err => err)
    // }else if(args.research_area) {
    //   return MembersData.findAll({'research_areas': {$elemMatch: {'area_id': args.research_area }}})
    //     .then((data) => data)
    //     .catch(err => err)
    } else {
      return Member.findAll({
        raw: true,
        include: [{
          model: Position,
          as: 'positions'
        }],
        order: [['family_name', 'ASC']]
      }).then(data => {
        const data_length = data.length;
        let results = [];

        for (let i = 0; i < data_length; i++) {
          if (results[data[i].scid]) {
            let position = {};
            position.department = data[i]["positions.department"];
            position.hr_department_id = data[i]["positions.hr_department_id"];
            position.performance_supervisor_scid = data[i]["positions.performance_supervisor_scid"];
            position.primary_position_indicator = data[i]["positions.primary_position_indicator"];
            position.room_id = data[i]["positions.room_id"];
            position.scs_position_class = data[i]["positions.scs_position_class"];
            position.scs_position_desc = data[i]["positions.scs_position_desc"];
            position.title = data[i]["positions.title"];


            results[data[i].scid].positions.push(position);
          }
          else {
            let data_row = {};
            data_row.andrew_id = data[i].andrew_id;
            data_row.biography = data[i].biography;
            data_row.display_email = data[i].display_email;
            data_row.display_name = data[i].display_name;
            data_row.email = data[i].email;
            data_row.family_name = data[i].family_name;
            data_row.fax_phone = data[i].fax_phone;
            data_row.given_name = data[i].given_name;
            data_row.homepage_url = data[i].homepage_url;
            data_row.hr_relationship = data[i].hr_relationship;
            data_row.hr_relationship_class = data[i].hr_relationship_class;
            data_row.hr_relationship_desc = data[i].hr_relationship_desc;
            data_row.image_url = data[i].image_url;
            data_row.is_alum = data[i].is_alum;
            data_row.middle_name = data[i].middle_name;
            data_row.name_suffix = data[i].name_suffix;
            data_row.phone_area_code = data[i].phone_area_code;
            data_row.phone_area_code_secondary = data[i].phone_area_code_secondary;
            data_row.phone_exchange = data[i].phone_exchange;
            data_row.phone_extension = data[i].phone_extension;
            data_row.phone_extension_secondary = data[i].phone_extension_secondary;
            data_row.scid = data[i].scid;
            data_row.scs_id = data[i].scs_id;
            data_row.scs_email = data[i].scs_email;
            data_row.scs_relationship_class = data[i].scs_relationship_class;
            data_row.scs_relationship_subclass = data[i].scs_relationship_subclass;
            data_row.scs_relationship_desc = data[i].scs_relationship_desc;
            data_row.positions = [];
            
            let position = {};
            position.building_id = data[i]["positions.building_id"];
            position.department = data[i]["positions.department"];
            position.hr_department_id = data[i]["positions.hr_department_id"];
            position.performance_supervisor_scid = data[i]["positions.performance_supervisor_scid"];
            position.primary_position_indicator = data[i]["positions.primary_position_indicator"];
            position.room_id = data[i]["positions.room_id"];
            position.scs_position_class = data[i]["positions.scs_position_class"];
            position.scs_position_desc = data[i]["positions.scs_position_desc"];
            position.title = data[i]["positions.title"];

            data_row.positions.push(position);

            results[data[i].scid] = data_row;
          }
        }


        let members = [];
        for (const result in results) {
          members.push(results[result]);
        }

        return members;
      });
    }
  }
}
