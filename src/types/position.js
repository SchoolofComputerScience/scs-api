import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql';


export const MemberPositionType = new GraphQLObjectType({
  name: 'MemberPosition',
  description: 'Positions of a Member Schema',
  fields: () => ({
    building_id: { type: GraphQLString },
    department: { type: GraphQLString },
    hr_department_id: { type: GraphQLString },
    performance_supervisor_scid: { type: GraphQLString },
    primary_position_indicator: { type: GraphQLString },
    room_id: { type: GraphQLString },
    scs_position_class: { type: GraphQLString },
    scs_position_desc: { type: GraphQLString },
    title: { type: GraphQLString }
  })
})