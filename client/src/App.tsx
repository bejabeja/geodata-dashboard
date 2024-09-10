import React from 'react';
import './App.css';
import MapSearch from './components/map/MapSearch'
import Sidebar from './components/sidebar/Sidebar';
import { useFilters } from './hooks/userFilters';
import UploadCsv from './components/uploadCsv/UploadCsv';

function App() {
  const { filters } = useFilters();

  return (
    <div className="app">
      <div className='app-header'>
        <h1 className='app-title'>Dashboard {filters.year}</h1>
        <UploadCsv />
      </div>

      <div className='app-content'>
        <div className='mapSearch'>
          <MapSearch></MapSearch>
        </div>
        <div className='sideBar'>
          <Sidebar></Sidebar>
        </div>
      </div>
    </div>
  );
}

export default App;
