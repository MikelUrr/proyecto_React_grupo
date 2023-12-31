import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';

const Favourites = () => {
  const [savedPokemons, setSavedPokemons] = useState([]);

  useEffect(() => {

    const existingData = JSON.parse(localStorage.getItem('pokemonData')) || [];
    setSavedPokemons(existingData);
  }, []);

  const handleRemoveFavorite = (pokemonId) => {
  
    const updatedPokemons = savedPokemons.filter((pokemon) => pokemon.id !== pokemonId);
    setSavedPokemons(updatedPokemons);

    
    localStorage.setItem('pokemonData', JSON.stringify(updatedPokemons));
  };

  return (
    <div>
      <h2>Favoritos</h2>
      {savedPokemons.length > 0 ? (
        <div className="contenedorfavoritos">
          {savedPokemons.map((savedPokemon) => (
            <PokemonCard
              key={savedPokemon.id}
              pokemon={savedPokemon}
              isFavorite={true}
              onRemoveFavorite={handleRemoveFavorite}
            />
          ))}
        </div>
      ) : (
        <p>No tienes Pokémon favoritos almacenados.</p>
      )}
    </div>
  );
};

export default Favourites;