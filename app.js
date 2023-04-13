const express = require('express');
const app = express();
const ejs = require('ejs')
require('dotenv').config();

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.get('/heatmap', (req, res) => {
  const mapboxToken = process.env.MAPBOX_TOKEN;
  res.render(__dirname + "/index.html", {token:mapboxToken});
});

app.get('/data.geojson', (req, res) => {
  res.sendFile('data.geojson', { root: __dirname });
});

const server = app.listen(3000, () => {
  //const port = server.address().port;
  //console.log(port);
  console.log('running on 3000')
});
