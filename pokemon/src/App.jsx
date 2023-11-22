import { useState } from 'react'
import './App.css'
//import TablaTipos from './components/tablaTipos'
import Pokedex from './components/pokedex'; 
import Favourites from "./components/Favourites"

function App() {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleTablaTiposClick = () => {
    setActiveComponent('tablaTipos');
  };
  const handlePokedexClick = () => {
    setActiveComponent('pokedex');
  };
  const handleFavouritesClick = () => {
    setActiveComponent('favourites');
  };
  const handleHomeClick = () => {
    setActiveComponent('');
  }

  return (
    <>
      <main>
        {activeComponent !== 'tablaTipos' && activeComponent !== 'pokedex' && activeComponent !=="favourites" && (
          <>
            <h1>Pokemongol</h1>
            <button onClick={handleTablaTiposClick}>Tabla de Tipos</button>
            <button onClick={handlePokedexClick}>Pokedex</button>
            <button onClick={handleFavouritesClick}>Favoritos</button>
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
        {activeComponent==="favourites" &&(
          <>
          <button onClick={handleHomeClick}>Atrás</button>
          <Favourites />
        </>
        )}
      </main>
    </>
  );
}

export default App;
