import {
  GraphQLList,
  GraphQLString
} from 'graphql';
import Db from './../db';
import sequelize from 'sequelize';
import moment from 'moment';

import { NewsType } from '../types/news';
const News = Db.models['news'];
const Op = sequelize.Op;

function buildNews(row) {
  let news = {};
  news.id = row.id;
  news.author = row.author;
  news.contact_person_scid = row.contact_person_scid;
  news.headline = row.headline;
  news.date = row.date;
  news.subheading = row.subheading;
  news.summary = row.summary;
  news.copy = row.copy;
  news.image = row.image;
  news.image_alt = row.image_alt;
  news.image_caption = row.image_caption;

  return news;
}

function queryNews(args) {
  let query_options = {};
  query_options.order = [['date', 'DESC']];
  query_options.where = {
    date: {
      [Op.gt]: moment("2017-1-1", "YYYY-MM-DD")
    }
  }

  if (args && args.id) {
    query_options.where.id = args.id;
  }

  return News.findAll(query_options).then(data => {
    const data_length = data.length;
    let results = [];

    for (let i = 0; i < data_length; i++) {
      results.push(buildNews(data[i]));
    }

    return results;
  });
}

export default {
  type: new GraphQLList(NewsType),
  description: 'SCS News',
  args: {
    id: { type: GraphQLString }
  },
  resolve: function (parent, args) {
    if (args && args.id) {
      return queryNews(args);
    } else {
      return queryNews();
    }
  }
}
