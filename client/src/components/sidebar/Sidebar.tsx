import './Sidebar.css';
import FilterSlider from '../filters/FilterYear';

function Sidebar() {
    return (
        <main>
            <header className='sidebar-header'>
                <h2>Studied cases</h2>
                <FilterSlider />
            </header>
        </main>
    );
}

export default Sidebar;
