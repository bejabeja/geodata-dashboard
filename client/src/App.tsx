import React from 'react';
import './App.css';
import MapSearch from './components/map/MapSearch'
import Sidebar from './components/sidebar/Sidebar';
import { useFilters } from './hooks/userFilters';
import UploadCsv from './components/uploadCsv/UploadCsv';
import Options from './components/options/Options';

function App() {
  const { filters } = useFilters();

  return (
    <main className="app">
      <header className='app-header'>
        <h1 className='app-title'>Dashboard {filters.year}</h1>
        <UploadCsv />
      </header>
      <section className='app-content'>
        <div className='app-top-content'>
          <div className='mapSearch'>
            <MapSearch></MapSearch>
          </div>
          <div className='sideBar-content'>
            <Sidebar></Sidebar>
          </div>
        </div>
        <div>
          <Options></Options>
        </div>
      </section>
    </main>
  );
}

export default App;
