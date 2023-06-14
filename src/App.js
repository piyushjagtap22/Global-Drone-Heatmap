import React from 'react';
import MapComponent from './component/MapComponent.js';
import data from './data.json'

const App = () => {
  return (
    <div>
      {/* Other components */}
      <MapComponent mapData ={data}/>
    </div>
  );
};

export default App;
