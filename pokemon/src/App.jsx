import { useState, useEffect } from 'react'
import './App.css'
import TablaTipos from './components/tablaTipos'
import Pokedex from './components/pokedex';
import Favourites from "./components/Favourites"
import GuessGame from "./components/GuessGame";

function App() {
  const [activeComponent, setActiveComponent] = useState("home");

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
    setActiveComponent('home');
  }

  const handleGuessGameClick = () => {
    setActiveComponent('GuessGame');
  }

  useEffect(() => {
    const body = document.querySelector('body')
    body.className = activeComponent
  }, [handleFavouritesClick, handleHomeClick, handlePokedexClick, handleTablaTiposClick,]);

  return (
    <>
      <main>
        {activeComponent !== 'tablaTipos' && activeComponent !== 'pokedex' && activeComponent !== "favourites" && activeComponent !== "GuessGame" && (
          <>
            <div className="mainmenu">
              <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/2052px-Pok%C3%A9_Ball_icon.svg.png" alt="" />
              <h1>Pokemongol</h1>
              <h2>Tu Pokéweb de Pokéconfianza</h2>
              <button onClick={handleTablaTiposClick}>Pokelucha</button>
              <button onClick={handlePokedexClick}>Pokedex</button>
              <button onClick={handleFavouritesClick}>Favoritos</button>
              <button onClick={handleGuessGameClick}>Adivinanza</button>
            </div>
          </>
        )}

        {activeComponent === 'tablaTipos' && (
          <>
            <button class="back" onClick={handleHomeClick}>Atrás</button>
            <TablaTipos />
          </>
        )}

        {activeComponent === 'pokedex' && (
          <>
            <button class="back" onClick={handleHomeClick}>Atrás</button>
            <Pokedex />
          </>

        )}
        {activeComponent === "favourites" && (
          <>
            <button onClick={handleHomeClick}>Atrás</button>
            <Favourites />
          </>
        )}
        {activeComponent === "GuessGame" && (
          <>
            <button class="back" onClick={handleHomeClick}>Atrás</button>
            <GuessGame />
          </>

        )}
      </main>
    </>
  );
}

export default App;
