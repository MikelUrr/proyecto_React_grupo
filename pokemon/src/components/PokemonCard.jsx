import React, { useState, useEffect } from 'react';

const PokemonCard = ({ pokemon }) => {
  const [language, setLanguage] = useState('en');
  const [detailedPokemon, setDetailedPokemon] = useState(null);
  const [savedPokemons, setSavedPokemons] = useState([]);

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
  
      setSavedPokemons(existingData);
      console.log(`Pokemon with ID ${pokemon.id} added to localStorage.`);
    } else {
      console.log(`Pokemon with ID ${pokemon.id} already exists in localStorage.`);
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

  // Obtener la entrada del texto del sabor correspondiente al idioma actual
  const flavorTextEntry = pokemon.flavor_text_entries.find(entry => entry.language.name === language);
  const generaInfo = pokemon.genera.find(info => info.language.name === language);
  const pokemonName = pokemon.names.find(nombre => nombre.language.name === language);

  return (
    <div className="card">
      <h3>{pokemonName ? pokemonName.name : 'Información no disponible en este idioma'}</h3>

      
      

      
      <div>
        
        <p>ID: {pokemon.id}</p>
        {detailedPokemon && (
          <>
            <img src={detailedPokemon.sprites.front_default}/>
            <p>Type: </p>
            <ul>
              {detailedPokemon.types.map((pokemon, index) => (
                <li key={index}>
                  {pokemon.type.name.toUpperCase()}
                </li>
              ))}
            </ul>
            
            
          </>
        )}
  <div>
        <button onClick={() => handleLanguageChange('fr')}>Frances</button>
        <button onClick={() => handleLanguageChange('en')}>English</button>
 
      </div>
        <p>Flavor Text: {flavorTextEntry ? flavorTextEntry.flavor_text : 'Texto no disponible en este idioma'}</p>
        <p>Genera: {generaInfo ? generaInfo.genus : 'Información no disponible en este idioma'}</p>
       
      </div>

      {/* Botón para guardar en localStorage */}
      <button onClick={handleSaveToLocalStorage}>Guardar en Local Storage</button>
    </div>
  );
};

export default PokemonCard;
