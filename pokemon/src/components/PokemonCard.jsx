import React, { useState, useEffect } from 'react';

const PokemonCard = ({ pokemon, isFavorite, onRemoveFavorite }) => {
  const [language, setLanguage] = useState('en');
  const [detailedPokemon, setDetailedPokemon] = useState(null);
  const [isDuplicate, setIsDuplicate] = useState(false);

  useEffect(() => {
   
    const existingData = JSON.parse(localStorage.getItem('pokemonData')) || [];
    const duplicate = existingData.some((existingPokemon) => existingPokemon.id === pokemon.id);
    setIsDuplicate(duplicate);
  }, [pokemon.id]);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const handleSaveToLocalStorage = () => {
    const combinedPokemon = { id: pokemon.id, ...pokemon, Detalles_Pokemon: detailedPokemon };

    const existingData = JSON.parse(localStorage.getItem('pokemonData')) || [];

    const isDuplicate = existingData.some((existingPokemon) => existingPokemon.id === pokemon.id);

    if (!isDuplicate) {
      existingData.push(combinedPokemon);
      localStorage.setItem('pokemonData', JSON.stringify(existingData));
      setIsDuplicate(true);
  
    } 
  };

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
        const data = await response.json();
        setDetailedPokemon(data);
      } catch (error) {
        console.error('Error fetching detailed Pokemon details:', error);
      }
    };

    fetchPokemonDetails();
  }, [pokemon.id]);

  
  const flavorTextEntry = pokemon.flavor_text_entries.find((entry) => entry.language.name === language);
  const generaInfo = pokemon.genera.find((info) => info.language.name === language);
  const pokemonName = pokemon.names.find((nombre) => nombre.language.name === language);

  return (
    <div className="pokemon-card">
      <h3>{pokemonName ? pokemonName.name : 'Información no disponible en este idioma'}</h3>

      <div className="pokemon-details">
        <p>ID: {pokemon.id}</p>

        {detailedPokemon && (
          <>
            <img src={detailedPokemon.sprites.front_default} alt={`${pokemonName.name} Sprite`} />
            <p>Type: </p>
            <ul className="pokemon-types">
              {detailedPokemon.types.map((type, index) => (
                <li key={index}>{type.type.name.toUpperCase()}</li>
              ))}
            </ul>
          </>
        )}
        <div className="language-buttons">
          <button onClick={() => handleLanguageChange('fr')}>Francés</button>
          <button onClick={() => handleLanguageChange('en')}>English</button>
        </div>
        <p className="flavor-text">{flavorTextEntry ? flavorTextEntry.flavor_text : 'Texto no disponible en este idioma'}</p>
        <p className="genera-info">{generaInfo ? generaInfo.genus : 'Información no disponible en este idioma'}</p>
      </div>
      
      {isFavorite ? (
        <button className="remove-favorite" onClick={() => onRemoveFavorite(pokemon.id)}>Eliminar de favoritos</button>
      ) : (
        <button className={isDuplicate ? 'already-favorite' : 'save-to-localstorage'} onClick={handleSaveToLocalStorage}>
          {isDuplicate ? 'Ya en favoritos' : 'Guardar en Favoritos'}
        </button>
      )}
    </div>
  );
};


export default PokemonCard;
