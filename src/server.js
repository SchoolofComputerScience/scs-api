const express = require('express')
const graph = require('express-graphql')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const schemata = require('./schema.js')

let app = express();

app.use(helmet.xssFilter());
app.use(helmet.frameguard({action: 'deny'}));
app.use(helmet.ieNoOpen());

app.use(compression({threshold: 0}))
app.use(cors());

app.set('trust proxy', true);

app.use(function (req, res, next) {
  if (req.get('x-appengine-https') === 'on' && !req.get('x-forwarded-proto')){
    req.headers['x-forwarded-proto'] = 'https';
  }
  next();
});

app.use('/graph', graph({
  schema: schemata.ScsApiSchema,
  allowUndefinedInResolve: false,
  pretty: true,
  graphiql: true,
  shouldBatch: true
}))

app.use('*', (req, res) => res.send('scs:cmu / api'))

app.listen(process.env.PORT || 5000, () => {
  console.log(`> scs:cmu / api / :5000\n`)
})
