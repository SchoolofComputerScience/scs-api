import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} from 'graphql';

export const EventsType = new GraphQLObjectType({
  name: 'Events',
  description: 'Events feed from Prismic.io',
  fields: () => ({
    id: { type: GraphQLString },
    uid: {
      type: GraphQLString,
      resolve: (parent, args) => parent.uid
    },
    room: {
      type: GraphQLString,
      resolve: (parent, args) => {
        let room = ''
        if(parent.data['events.room']){
          room = parent.data['events.room'].value[0].text
        }
        return parent.data ? room : parent.room || ''
      }
    },
    building: {
      type: GraphQLString,
      resolve: (parent,args) => parent.data['events.location'].value[0].text
    },
    title: {
      type: GraphQLString,
      resolve: (parent,args) => parent.data['events.title'].value[0].text
    },
    abstract: {
      type: GraphQLString,
      resolve: (parent,args) => parent.data['events.description'].value[0].text
    },
    startDate: {
      type: GraphQLString,
      resolve: (parent,args) => parent.data['events.starttime'].value
    },
    endDate: {
      type: GraphQLString,
      resolve: (parent,args) => parent.data['events.endtime'].value
    },
    talkTitle: {
      type: GraphQLString,
      resolve: (parent,args) => parent.data['events.subtitle'].value[0].text
    },
    speakerName: {
      type: GraphQLString,
      resolve: (parent,args) => parent.data['events.speakerName'].value[0].text
    },
    speakerCompany: {
      type: GraphQLString,
      resolve: (parent,args) => parent.data['events.speakerCompany'].value[0].text
    },
    speakerCompanyTeam: {
      type: GraphQLString,
      resolve: (parent,args) => parent.data['events.speakerCompanyTeam'].value[0].text
    },
    type: {
      type: GraphQLString,
      resolve: (parent,args) => parent.data['events.eventtype'].value
    },
    tags: {
      type: new GraphQLList(GraphQLString),
      resolve: (parent,args) => parent.tags
    },
    eventUrl: {
      type: GraphQLString,
      resolve: (parent,args) => parent.data['events.eventurl'].value.url
    },
    poster: {
      type: GraphQLString,
      resolve: (parent,args) => parent.data['events.posterurlpdf'].value.url
    },
    posterText: {
      type: GraphQLString,
      resolve: (parent,args) => parent.posterText
    }
  })
})
