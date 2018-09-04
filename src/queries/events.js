import {
  GraphQLList,
  GraphQLString
} from 'graphql';
import Db from './../db';
import sequelize from 'sequelize';
import moment from 'moment';

import { EventsType } from '../types/events';
const Events = Db.models['events'];
const Op = sequelize.Op;

function buildEvent(row) {
  let event = {};
  event.id = row.id;
  event.room = row.room_number;
  event.building = row.building_id;
  event.name = row.name;
  event.start_date = moment.utc(row.start_date);
  event.end_date = moment.utc(row.end_date);
  event.speakerName = row.speaker_name;
  event.eventUrl = row.speaker_url;
  event.event_type = row.event_type;
  event.description = row.description;
  event.poster_text = row.poster_text;
  event.poster_url = row.poster_url;

  return event;
}

function queryEvents(args) {
  let query_options = {};
  query_options.order = [['start_date', 'ASC']];
  query_options.where = { 
    start_date: { 
      [Op.gt]: moment("2018-7-1", "YYYY-MM-DD")
    }
  }

  if (args && args.id) {
    query_options.where.id = args.id;
  }

  return Events.findAll(query_options).then(data => {
    const data_length = data.length;
    let results = [];

    for (let i = 0; i < data_length; i++) {
      results.push(buildEvent(data[i]));
    }

    return results;
  });
}

export default {
  type: new GraphQLList(EventsType),
  description: 'SCS Events',
  args: {
    id: { type: GraphQLString }
  },
  resolve: function (parent, args) {
    if (args && args.id) {
      return queryEvents(args);
    } else {
      return queryEvents();
    }
  }
}
