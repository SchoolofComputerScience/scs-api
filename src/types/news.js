import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} from 'graphql';

import { TagScids } from './utils';

export const NewsType = new GraphQLObjectType({
  name: 'News',
  description: 'SCS News',
  fields: () => ({
    id:{ type:GraphQLString },
    //tags: { type: new GraphQLList(TagScids) },
    image: { type: GraphQLString },
    image_alt: { type: GraphQLString },
    image_caption: { type: GraphQLString },
    date: { type: GraphQLString },
    author: { type: GraphQLString },
    contact_person_scid: { type: GraphQLString },
    headline: { type: GraphQLString },
    copy: { type: GraphQLString },
    summary: { type: GraphQLString },
    subheading: { type: GraphQLString }
  })
})

export const NewsArticleType = new GraphQLObjectType({
  name: 'NewsArticle',
  description: 'Single news article from Prismic.io',
  args: {
    uid: { type: GraphQLString }
  },
  fields: () => ({
    title: {
      type: GraphQLString,
      resolve: (parent,args) => parent.results[0].data['news.title'].value[0].text
    },
    tags: {
      type: new GraphQLList(TagScids),
      resolve: (parent, args) => parent.results[0].tags
    },
    uid: {
      type: GraphQLString,
      resolve: (parent, args) => parent.results[0].uid
    },
    image: {
      type: GraphQLString,
      resolve: (parent, args) => parent.results[0].data['news.image'].value.main.url
    },
    author: {
      type: GraphQLString,
      resolve: (parent, args) => parent.results[0].data['news.author'].value
    },
    subtext: {
      type: GraphQLString,
      resolve: (parent, args) => parent.results[0].data['news.caption'].value[0].text
    },
    date: {
      type: GraphQLString,
      resolve: (parent, args) => parent.results[0].data['news.publish_date'].value
    },
    body: {
      type: GraphQLString,
      resolve: (parent, args) => parent.results[0].getStructuredText('news.eventbody').asHtml()
    },
  })
})
