import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';

const Favourites = () => {
  const [savedPokemons, setSavedPokemons] = useState([]);

  useEffect(() => {
    // Obtener datos almacenados localmente al cargar el componente
    const existingData = JSON.parse(localStorage.getItem('pokemonData')) || [];
    setSavedPokemons(existingData);
  }, []);

  const handleRemoveFavorite = (pokemonId) => {
    // Eliminar el Pokémon de la lista de favoritos
    const updatedPokemons = savedPokemons.filter((pokemon) => pokemon.id !== pokemonId);
    setSavedPokemons(updatedPokemons);

    // Actualizar el almacenamiento local
    localStorage.setItem('pokemonData', JSON.stringify(updatedPokemons));
  };

  return (
    <div>
      <h2>Favoritos</h2>
      {savedPokemons.length > 0 ? (
        <div>
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