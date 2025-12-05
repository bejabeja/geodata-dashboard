import "./App.css";
import FilterYear from "./components/filters/FilterYear";
import MapSearch from "./components/map/MapSearch";
import Options from "./components/options/Options";
import { useFilters } from "./hooks/userFilters";

function App() {
  const { filters } = useFilters();

  return (
    <main className="app">
      <header className="app-header">
        <h1 className="app-title">Swiss Bird Flu</h1>
        <h2 className="app-subtitle">Geodata Dashboard {filters.year}</h2>
      </header>

      <section className="filters-bar">
        <div className="filter-item">
          <label>Year</label>
          <FilterYear />
        </div>
      </section>

      <section className="app-content">
        <div className="map-container">
          <MapSearch />
        </div>

        <Options />
      </section>
    </main>
  );
}

export default App;
