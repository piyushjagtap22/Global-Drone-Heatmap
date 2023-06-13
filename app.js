const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());

app.use(cors({
  origin: '*'
}));

app.get('/heatmap', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.get('/data.geojson', (req, res) => {
  res.sendFile('data.geojson', { root: __dirname });
});



app.get('/', (req, res) => {
  res.send('Hey ')
})



const server = app.listen(0, () => console.log(`Server started on port :`,server.address().port));
// Export the Express API
module.exports = app