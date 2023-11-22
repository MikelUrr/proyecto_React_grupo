import React, { useState } from 'react';

const PokemonCard = ({ pokemon }) => {
  const [language, setLanguage] = useState('en'); // Establece el idioma inicial, por ejemplo, 'es' para español

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const handleSaveToLocalStorage = () => {
    // Guardar información en el almacenamiento local
    localStorage.setItem('pokemonData', JSON.stringify(pokemon));
  };

  // Obtener la entrada del texto del sabor correspondiente al idioma actual
  const flavorTextEntry = pokemon.flavor_text_entries.find(entry => entry.language.name === language);
  const generaInfo = pokemon.genera.find(info => info.language.name === language);
  const pokemonName= pokemon.names.find(nombre=>nombre.language.name === language)

  return (
    <div className="card">
      <h3>{pokemonName ? pokemonName.name : 'Información no disponible en este idioma'}</h3>

      {/* Botones para cambiar de idioma */}
      <div>
        <button onClick={() => handleLanguageChange('es')}>Español</button>
        <button onClick={() => handleLanguageChange('en')}>English</button>
        {/* Agrega más botones para otros idiomas si es necesario */}
      </div>

      {/* Contenido del Pokémon en función del idioma */}
      <div>
        <p>ID: {pokemon.id}</p>
        <p>Type: {pokemon.type}</p>
        <p>Flavor Text: {flavorTextEntry ? flavorTextEntry.flavor_text : 'Texto no disponible en este idioma'}</p>
        <p>Genera: {generaInfo ? generaInfo.genus : 'Información no disponible en este idioma'}</p>
        {/* Otros campos... */}
      </div>

      {/* Sabor del texto en el idioma seleccionado */}
    

      {/* Botón para guardar en localStorage */}
      <button onClick={handleSaveToLocalStorage}>Guardar en Local Storage</button>
    </div>
  );
};

export default PokemonCard;

