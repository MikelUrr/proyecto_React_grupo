import { useState } from 'react'
import './App.css'
//import TablaTipos from './components/tablaTipos'
import Pokedex from './components/pokedex'; 

function App() {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleTablaTiposClick = () => {
    setActiveComponent('tablaTipos');
  };
  const handlePokedexClick = () => {
    setActiveComponent('pokedex');
  };

  const handleHomeClick = () => {
    setActiveComponent('');
  }

  return (
    <>
      <main>
        {activeComponent !== 'tablaTipos' && activeComponent !== 'pokedex' && (
          <>
            <h1>Pokemongol</h1>
            <button onClick={handleTablaTiposClick}>Tabla de Tipos</button>
            <button onClick={handlePokedexClick}>Pokedex</button>
          </>
        )}

        {activeComponent === 'tablaTipos' && ( 
          <>
            <button onClick={handleHomeClick}>Atrás</button>
            <TablaTipos />
          </>
        )}

        {activeComponent === 'pokedex' && (
          <>
            <button onClick={handleHomeClick}>Atrás</button>
            <Pokedex />
          </>
        )}
      </main>
    </>
  );
}

export default App;
