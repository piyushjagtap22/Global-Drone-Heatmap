const express = require('express');
const app = express();

app.get('/heatmap', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.get('/10_may_global_home_positions.geojson', (req, res) => {
  res.sendFile('data.geojson', { root: __dirname });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
