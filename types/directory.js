import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLFloat
} from 'graphql';

const data = require('./data.js')

export const MemberType new GraphQLObjectType({
  name: 'Member',
  description: 'Available properties for SCS members',
  fields: () => ({
    _id: { type: GraphQLString },
    andrew_id: { type: GraphQLString },
    biography: { type: GraphQLString },
    display_email: { type: GraphQLString },
    email: { type: GraphQLString },
    family_name: { type: GraphQLString },
    fax_phone: { type: GraphQLString },
    given_name: { type: GraphQLString },
    homepage_url: { type: GraphQLString },
    image_url: { type: GraphQLString },
    is_alum: { type: graphql.GraphQLBoolean  },
    middle_name: { type: GraphQLString },
    name_suffix: { type: GraphQLString },
    phone_area_code: { type: GraphQLFloat  },
    phone_area_code_secondary: { type: GraphQLFloat  },
    phone_exchange: { type: GraphQLFloat  },
    phone_extension: { type: GraphQLString },
    phone_extension_secondary: { type: GraphQLString },
    positions: { type: GraphQLList(memberPositionType)  },
    hr_relationship: { type: GraphQLString },
    hr_relationship_class: { type: GraphQLString },
    hr_relationship_desc: { type: GraphQLString },
    scs_relationship_desc: { type: GraphQLString },
    scs_relationship_class: { type: GraphQLString },
    research_areas: { type: GraphQLList(memberResearchAreasType) },
    phone_full: {
      type: GraphQLString,
      resolve: function(member){
        return `(${member.phone_area_code}) ${member.phone_exchange} - ${member.phone_extension}`
      }
    },
    phone_full_call: {
      type: GraphQLString,
      resolve: function(member){
        return `${member.phone_area_code}${member.phone_exchange}${member.phone_extension}`
      }
    },
    full_name: {
      type: GraphQLString,
      resolve: function(member) {
        return member.given_name + ' ' + member.family_name;
      }
    },
    scid: { type: GraphQLString },
    scs_id: { type: GraphQLString },
    scs_email: { type: GraphQLString },
    scs_relationship_class: { type: GraphQLString },
    scs_relationship_desc: { type: GraphQLString },
    gsProfile: {
      type: GraphQLList(gsProfileType),
      resolve: function(args) {
        if(args.scid)
          return data.getGsProfileData()
            .find({
              scid :`${args.scid}`
            })
            .then((data) => data)
            .catch(err =>  err)
      }
    },
    gsPublication: {
      type: GraphQLList(gsPublicationType),
      resolve: function(args) {
        if(args.scid)
          return data.getGsPublicationData()
            .find({
              scid :`${args.scid}`,
              pub_year: { $exists: true },
              authors: { $exists: true }
            })
            .then((data) => data)
            .catch(err =>  err)
      }
    },
    news: {
      type: GraphQLList(newsType),
      args: {
        limit: { type: GraphQLInt }
       },
      resolve: function(_, args) {
        return data.getNewsWithTag(_.scid, args);
      }
    },
    events: {
      type: GraphQLList(eventsType),
      args: {
        limit: { type: GraphQLInt }
       },
      resolve: function(_, args){
        return data.getEventsWithTag(_.scid, args);
      }
    },
    courses: {
      type: GraphQLList(coursesType),
      resolve: function(args){
        return data.getCourses()
          .find({
            instructors: { $elemMatch: { scid: `${args.scid}` } },
            semesterCode: `${data.getNextSemesterCode()}`
          })
          .catch(err => err)
      }
    }
  })
});
