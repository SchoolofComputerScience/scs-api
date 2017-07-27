import pris from 'prismic.io';
import dotenv from 'dotenv';
dotenv.load({ path: '.env' });

const prismicApi = process.env.PRISMIC;

export function getDepartmentWithId(uid){
  return pris.api(prismicApi)
    .then(function(api) {
      return api.query(
        `[[:d = at(my.departments.uid,"${uid}")]]`
      )
    })
    .then((res) => [res])
    .catch(err => err)
}
