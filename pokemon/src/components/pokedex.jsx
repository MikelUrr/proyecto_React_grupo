import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';


const Pokedex = () => {
    const [generations, setGenerations] = useState([]);
    const [selectedGeneration, setSelectedGeneration] = useState(null);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [showPokemonList, setShowPokemonList] = useState(true);

    // Función para realizar fetch de datos
    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; // Re-lanzar el error para que el componente pueda manejarlo
        }
    };

    const fetchGenerations = async () => {
        try {
            const data = await fetchData('https://pokeapi.co/api/v2/generation/');
            setGenerations(data.results);
        } catch (error) {
            // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
            console.error('Error fetching generations:', error);
        }
    };

    const fetchGenerationDetails = async (generationUrl) => {
        try {
            const data = await fetchData(generationUrl);
            setSelectedGeneration(data);
            setSelectedPokemon(null); // Resetear el Pokemon seleccionado al cambiar de generación
        } catch (error) {
            // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
            console.error('Error fetching generation details:', error);
        }
    };

    const fetchPokemonDetails = async (pokemonUrl) => {
        try {
            console.log('Fetching details for:', pokemonUrl);
            const data = await fetchData(pokemonUrl);
            console.log('Pokemon details:', data);
            setSelectedPokemon(data);
            setShowPokemonList(false);
        } catch (error) {
            console.error('Error fetching Pokemon details:', error);
        }
    };
    const handleHomeClick = () => {
        setActiveComponent('');
      }

    useEffect(() => {
        // Llamar a la función para obtener la lista de generaciones
        fetchGenerations();
    }, []);


    return (
        <div className="pokedex-container">
            {!showPokemonList ? (
                <div className="pokemon-card-container">
                    <PokemonCard pokemon={selectedPokemon} />
                </div>
            ) : (
                <>
                    {selectedGeneration ? (
                        <div className="generation-container">
                            <h2>{selectedGeneration.name.toUpperCase()} Pokedex</h2>
                            {selectedGeneration.pokemon_species.length > 0 ? (
                                <ul className="pokemon-list">
                                    {selectedGeneration.pokemon_species.map((pokemon, index) => (
                                        <li key={index}>
                                            <a
                                                className="pokemon-button"
                                                onClick={() => fetchPokemonDetails(pokemon.url)}
                                            >
                                                {pokemon.name.toUpperCase()}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="no-pokemon-message">No hay Pokémon disponibles en esta generación.</p>
                            )}
                        </div>
                    ) : (
                        <div className="select-generation-container">
                            <h2>Selecciona una generación:</h2>
                            <div className="generation-buttons">
                                {generations.map((generation, index) => (
                                    <a
                                        key={index}
                                        className="generation-button"
                                        onClick={() => fetchGenerationDetails(generation.url)}
                                    >
                                        {generation.name.toUpperCase()}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
export default Pokedex;
