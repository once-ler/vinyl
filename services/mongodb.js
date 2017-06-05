const micro = require('micro');
const {json} = require('micro');
const Engine = require('tingodb')();
const db = new Engine.Db('/some/local/path', {});

const sleep = ms => new Promise(resolve => setTimeout(() => resolve(), ms));

const server = micro(async (req, res) => {
  const js = await json(req);
  console.info(js);
  await sleep(500);
  return js;
});

server.listen(7771);

// npm-run-all --parallel start-watch wp-serve
//  curl -XPOST -H 'Content-Type: application/json' -d'{"a": "b"}' localhost:7771
