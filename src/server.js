import express from 'express';
import graph from 'express-graphql';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import { ScsApiSchema } from './schema.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
dotenv.load({ path: '.env' });

mongoose.connect(process.env.DB_CONNECT);
mongoose.connection.on('error', () => console.log('> scs:cmu / mongo error'))
mongoose.connection.once('open', () => console.log('> scs:cmu / mongo connected\n'))

if(!process.env.NODE_ENV === 'production')
  mongoose.set('debug', true)

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
  schema: ScsApiSchema,
  allowUndefinedInResolve: false,
  pretty: true,
  graphiql: true,
  shouldBatch: true
}))

app.use('/content/:page_name', function(req, res, next){
  const pageName = req.params.page_name;
  const contentFolder = './src/content';
  let fileLoc = path.resolve(contentFolder);
  fileLoc = path.join(fileLoc, pageName);
  let stream = fs.createReadStream(fileLoc + '.md');

  stream.on('error', function(error) {
    res.writeHead(404, 'Not Found');
    res.end();          
  });

  stream.pipe(res);
});


app.use('*', (req, res) => res.send('scs:cmu / api'))

app.listen(process.env.PORT || 5000, () => {
  console.log(`> scs:cmu / api / :5000\n`)
})
