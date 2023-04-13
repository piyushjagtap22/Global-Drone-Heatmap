const express = require('express');
const app = express();
const ejs = require('ejs')
require('dotenv').config();

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.get('/heatmap.html', (req, res) => {
  const mapboxToken = process.env.MAPBOX_TOKEN;
  res.render(__dirname + "/heatmap.html", {token:mapboxToken});
});

app.get('/data.geojson', (req, res) => {
  res.sendFile('data.geojson', { root: __dirname });
});

const server = app.listen(0, () => {
  const port = server.address().port;
  const url = `http://localhost:${port}`;
  console.log(`Server listening on ${url}/heatmap`);

});
