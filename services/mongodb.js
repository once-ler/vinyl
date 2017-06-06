const micro = require('micro');
const {json, send} = require('micro');
const Engine = require('tingodb')();
const {loadMovies} = require('./helper');
const sleep = ms => new Promise(resolve => setTimeout(() => resolve(), ms));

const dropColl = () => new Promise(resolve => {
  const db = new Engine.Db('./services/db', {});
  const coll = db.collection('test');
  coll.drop((e) => resolve());
});
const insert = doc => new Promise(resolve => {
  const db = new Engine.Db('./services/db', {});
  const coll = db.collection('test');
  coll.insert(doc, e => resolve());
});

const init = async () => {
  const res = await loadMovies();
  const { data: { data: { reddit: { subreddit: { topListings } } } } } = res;
  
  const process = async (list) => {
    for (const doc of list)
      await insert(doc);
  }

  await process(topListings);
}

const server = micro(async (req, res) => {
  const js = await json(req);
  
  const {skip, limit, match, project} = js;
  const db = new Engine.Db('./services/db', {});
  const coll = db.collection('test');

  const search = () => new Promise((resolve, reject) =>
    coll.find(match || {}, project)
      .skip(skip || 0)
      .limit(limit || 0)
      .toArray((err, docs) => { if (err) return reject(err); resolve(docs); }));

  const r = await search();

  return r;
});

const start = async () => {
  await dropColl();
  await init();
  server.listen(7771);
};

start();

// npm-run-all --parallel start-watch wp-serve
//  curl -XPOST -H 'Content-Type: application/json' -d'{"limit": 5}' localhost:7771
//  curl -XPOST -H 'Content-Type: application/json' -d'{"limit": 5, "project": { "title": 1, "_id": 0 }}' localhost:7771
//  curl -XPOST -H 'Content-Type: application/json' -d'{"limit": 5, "match": { "title": { "$regex": "wonder", "$options": "i" } }, "project": { "title": 1, "_id": 0 }}' localhost:7771

