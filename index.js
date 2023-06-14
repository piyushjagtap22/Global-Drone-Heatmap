const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(express.json());

app.use(cors({
  origin: '*'
}));

app.get('/heatmap', (req, res) => {
  const filePath = path.join(__dirname, 'index.html');
  res.sendFile(filePath);
});
app.get('/data.geojson', (req, res) => {
  const filePath = path.join(__dirname, 'data.geojson');
  res.sendFile(filePath);
});

app.get('/', (req, res) => {
  res.send('..')
})



const server = app.listen(0, () => console.log(`Server started on port :`,server.address().port));
// Export the Express API
module.exports = app