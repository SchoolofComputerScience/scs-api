import pris from 'prismic.io';
import dotenv from 'dotenv';
dotenv.load({ path: '.env' });

const prismicApi = process.env.PRISMIC;

export function getNews(limit){
  return pris.api(prismicApi)
    .then(function(api) {
      return api.query(
        pris.Predicates.at('document.type', 'news'),
        { pageSize : limit, orderings : '[my.news.publish_date desc]' }
      )
    })
    .then(res => res.results)
    .catch(err => err)
}

export function getNewsWithTag(tag, args){
  let limit = args ? args.limit : 20
  return pris.api(prismicApi)
    .then(function(api) {
      return api.query(
        [ pris.Predicates.at('document.type', 'news'),
          pris.Predicates.at("document.tags", [tag]) ],
        { pageSize: limit, orderings :'[my.news.publish_date desc]' }
      )
    })
    .then(res => res.results)
    .catch(err => err)
}

export function getNewsWithSearch(topic){
  return pris.api(prismicApi)
    .then(function(api) {
      return api.query(
        [ pris.Predicates.at('document.type', 'news'),
          pris.Predicates.fulltext('document', `${topic}`) ],
        { pageSize: 20, orderings :'[my.news.publish_date desc]' }
      )
    })
    .then(res => res.results)
    .catch(err => err)
}

export function getNewsWithId(uid){
  return pris.api(prismicApi)
    .then(function(api) {
      return api.query(
        `[[:d = at(my.news.uid,"${uid}")]]`
      )
    })
    .then(res => [res])
    .catch(err => err)
}
