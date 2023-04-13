const express = require('express');
const app = express();
const routePrefix = process.env.ROUTE_PREFIX || '';


app.get(routePrefix + '/heatmap', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.get('/data.geojson', (req, res) => {
  res.sendFile('data.geojson', { root: __dirname });
});

const server = app.listen(0, () => {
  const port = server.address().port;
  console.log(port);
});
