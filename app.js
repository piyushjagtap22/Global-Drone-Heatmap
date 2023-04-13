const express = require('express');
const app = express();


app.get('/heatmap', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.get('/data.geojson', (req, res) => {
  res.sendFile('data.geojson', { root: __dirname });
});

const server = app.listen(0, () => {
  const port = server.address().port;
  const url = `http://localhost:${port}/heatmap`;
  console.log(`Server started on ${url}`);
});