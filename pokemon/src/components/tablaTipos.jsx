// Pokedex.js
import React, { useState, useEffect } from 'react';

const tablaTipos = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [error, setError] = useState("");
  const [currentUrl, setCurrentUrl] = useState("https://pokeapi.co/api/v2/pokemon/?limit=9999");
  const [leftPokemon, setLeftPokemon] = useState(null);
  const [rightPokemon, setRightPokemon] = useState(null);
  const [winner, setWinner] = useState(null);
  const [fightButton, setFightButton] = useState(true);

  useEffect(() => {
    getPokemons();
  }, []);

  useEffect(() => {
    setWinner(null);
    setFightButton(true);
  }, [leftPokemon, rightPokemon])



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
    fighting: ["normal", "rock", "steel", "ice", "dark"],
    flying: ["fighting", "bug", "grass"],
    poison: ["grass", "fairy"],
    ground: ["poison", "rock", "steel", "fire", "electric"],
    rock: ["flying", "bug", "fire", "ice"],
    bug: ["grass", "psychic", "dark"],
    ghost: ["ghost", "psychic"],
    steel: ["rock", "ice", "fairy"],
    fire: ["bug", "steel", "grass", "ice"],
    water: ["ground", "rock", "fire"],
    grass: ["ground", "rock", "water"],
    electric: ["flying", "water"],
    psychic: ["fighting", "poison"],
    ice: ["flying", "ground", "grass", "dragon"],
    dragon: ["dragon"],
    fairy: ["fighting", "dragon", "dark"],
    dark: ["ghost", "psychic"]
  }

  const handleFight = async () => {
    //get leftPokemon type
    const typeLeft = leftPokemon.types[0].type.name;
    const typeRight = rightPokemon.types[0].type.name;

    setFightButton(false);
    const leftDiv = document.getElementById("leftpokemon");
    const rightDiv = document.getElementById("rightpokemon");

    rightDiv.className="rightpokemonfight";
    leftDiv.className="leftpokemonfight";


    setTimeout(() => {
      if (typeStrong[typeLeft].includes(typeRight)) {
        console.log(`${leftPokemon.name} gana a ${rightPokemon.name}`)
        setFightButton(false);
        setWinner(leftPokemon)
      } else if (typeStrong[typeRight].includes(typeLeft)) {
        setFightButton(false);
        setWinner(rightPokemon)
        console.log(`${rightPokemon.name} gana a ${leftPokemon.name}`)
      } else {
        setFightButton(false);
        setWinner("Empate")
        console.log("Empate")
      }
    }, 5000);



  }

  const FightButton = () => {
    return (
      <button id="fightbutton" onClick={handleFight}>Fight</button>
    )
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
          <div id='leftpokemon'>
            <img src={leftPokemon ? leftPokemon.sprites.front_default : ""} alt="" />
            <p>{leftPokemon ? leftPokemon.name : "Selecciona un Pokémon"}</p>
            <p>{/* TYPES */}</p>
          </div>
        </div>
        <div className="mid">
          {leftPokemon && rightPokemon && winner !== "Empate" && fightButton && (
            <FightButton />
          )}
          {console.log(winner)}
          {winner && winner !== "Empate" && (
            <div className="winner">
              {winner.sprites.front_default && (
                <img src={winner.sprites.front_default} alt="" />
              )}
              <p>{winner.name}</p>

            </div>
          )}
          {winner && winner === "Empate" && (
            <p>Empate</p>
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
          <div id='rightpokemon'>
            <img src={rightPokemon ? rightPokemon.sprites.front_default : ""} alt="" />
            <p>{rightPokemon ? rightPokemon.name : "Selecciona un Pokémon"}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default tablaTipos;