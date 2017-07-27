import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} from 'graphql';

import { TagScids } from './utils';

export const NewsType = new GraphQLObjectType({
  name: 'News',
  description: 'News feed from Prismic.io',
  fields: () => ({
    id:{ type:GraphQLString },
    uid: { type: GraphQLString},
    tags: {
      type: new GraphQLList(TagScids),
      resolve: (parent, args) => parent.tags
    },
    image: {
      type: GraphQLString,
      resolve: (parent, args) => parent.data['news.image'].value.main.url
    },
    date: {
      type: GraphQLString,
      resolve: (parent, args) => parent.data['news.publish_date'].value
    },
    title: {
      type: GraphQLString,
      resolve: (parent, args) => parent.data['news.title'].value[0].text
    }
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
