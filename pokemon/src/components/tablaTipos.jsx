// Pokedex.js
import React, { useState, useEffect } from 'react';

const tablaTipos = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [error, setError] = useState("");
  const [currentUrl, setCurrentUrl] = useState("https://pokeapi.co/api/v2/pokemon/?limit=9999");
  const [leftPokemon, setLeftPokemon] = useState(null);
  const [rightPokemon, setRightPokemon] = useState(null);

  useEffect(() => {
    getPokemons();
  }, []);

  

  const getPokemons = async () => {
    try {
      const data = await fetch(currentUrl);
      const results = await data.json();
      setPokemonList(results.results);
    } catch (e) {
      setError("Algo salió mal");
      console.error(e);
    }
  };

  const fetchPokemonDetails = async (pokemonUrl, side) => {
    try {
      const data = await fetch(pokemonUrl);
      const results = await data.json();

      if (side === "left") {
        setLeftPokemon(results);
      } else {
        setRightPokemon(results);
      }
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
    }
  };

  const typeStrong = {
    normal: [],
    fighting: ["normal","rock","steel","ice","dark"],
    flying: ["fighting","bug","grass"],
    poison: ["grass","fairy"],
    ground: ["poison","rock","steel","fire","electric"],
    rock: ["flying","bug","fire","ice"],
    bug: ["grass", "psychic","dark"],
    ghost: ["ghost","psychic"],
    steel: ["rock","ice","fairy"],
    fire: ["bug","steel","grass","ice"],
    water: ["ground","rock","fire"],
    grass: ["ground","rock","water"],
    electric: ["flying","water"],
    psychic: ["fighting","poison"],
    ice: ["flying","ground","grass","dragon"],
    dragon: ["dragon"],
    fairy: ["fighting","dragon","dark"],
    dark: ["ghost","psychic"]
  }

  const handleFight = async () => {
    //get leftPokemon type
    const typeLeft = leftPokemon.types[0].type.name;
    const typeRight = rightPokemon.types[0].type.name;

    if(typeStrong[typeLeft].includes(typeRight)) {
      console.log(`${leftPokemon.name} gana a ${rightPokemon.name}`)
    } else if (typeStrong[typeRight].includes(typeLeft)) {
      console.log(`${rightPokemon.name} gana a ${leftPokemon.name}`)
    } else {
      console.log("Empate")
    }
  }


  
  return (
    <>
      <h1>¿Quién ganará?</h1>
      <section className="fight">
        <div className="left">
          <ul>
            {pokemonList.map((pokemon, index) => (
              <li key={index}>
                <button onClick={() => fetchPokemonDetails(pokemon.url, "left")}>
                  {pokemon.name.toUpperCase()}
                </button>
              </li>
            ))}
          </ul>
          <div>
            <img src={leftPokemon ? leftPokemon.sprites.front_default : ""} alt="" />
            <p>{leftPokemon ? leftPokemon.name : "Selecciona un Pokémon"}</p>
            <p>{/* TYPES */}</p>
          </div>
        </div>
        <div className="mid">
          {leftPokemon && rightPokemon && (
            <button onClick={() => handleFight ()}></button>
          )}
        </div>
        <div className="right">
          <ul>
            {pokemonList.map((pokemon, index) => (
              <li key={index}>
                <button onClick={() => fetchPokemonDetails(pokemon.url, "right")}>
                  {pokemon.name.toUpperCase()}
                </button>
              </li>
            ))}
          </ul>
          <div>
            <img src={rightPokemon ? rightPokemon.sprites.front_default : ""} alt="" />
            <p>{rightPokemon ? rightPokemon.name : "Selecciona un Pokémon"}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default tablaTipos;