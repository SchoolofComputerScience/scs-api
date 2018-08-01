import pris from 'prismic.io';
import dotenv from 'dotenv';
dotenv.load({ path: '.env' });

const prismicApi = process.env.PRISMIC;

export function getEvents(limit){
  return pris.api(prismicApi)
    .then(function(api) {
      return api.query(
        pris.Predicates.at('document.type', 'events'),
        { pageSize : limit, orderings : '[my.events.starttime desc]' }
      )
    })
    .then(res => res.results)
    .catch(err => err)
}

export function getEventsWithTag(tag, args){
  let limit = args ? args.limit : 20
  return pris.api(prismicApi)
    .then(function(api) {
      return api.query(
        [ pris.Predicates.at('document.type', 'events'),
          pris.Predicates.at("document.tags", [tag]) ],
        { pageSize: limit, orderings :'[my.events.starttime desc]' }
      )
    })
    .then(res => res.results )
    .catch(err => err)
}

export function getEventsWithSearch(topic){
  return pris.api(prismicApi)
    .then(function(api) {
      return api.query(
        [ pris.Predicates.at('document.type', 'events'),
          pris.Predicates.fulltext('document', `${topic}`)],
        { pageSize: 20, orderings :'[my.events.starttime desc]' }
      )
    })
    .then(res => res.results)
    .catch(err => err)
}

export function getEventsWithId(uid){
  return pris.api(prismicApi)
    .then(function(api) {
      return api.query(
        `[[:d = at(my.events.uid,"${uid}")]]`
      )
    })
    .then((res) => [res])
    .catch(err => err)
}
