// Pokedex.js
import React, { useState, useEffect } from 'react';
import fightImage from '../assets/fight.png'

const tablaTipos = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [error, setError] = useState("");
  const [currentUrl, setCurrentUrl] = useState("https://pokeapi.co/api/v2/pokemon/?limit=9999");
  const [leftPokemon, setLeftPokemon] = useState(null);
  const [rightPokemon, setRightPokemon] = useState(null);
  const [winner, setWinner] = useState(null);
  const [fightButton, setFightButton] = useState(true);
  const [busquedaIzquierda, setBusquedaIzquierda] = useState('');
  const [busquedaDerecha, setBusquedaDerecha] = useState('');

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
        const leftDiv = document.getElementById("leftpokemon");
        const rightDiv = document.getElementById("rightpokemon");
        leftDiv.style.display = "block";
        rightDiv.style.display = "block";
        leftDiv.classList.remove("leftpokemonfight")
        rightDiv.classList.remove("rightpokemonfight")
        setLeftPokemon(results);
      } else {
        const leftDiv = document.getElementById("leftpokemon");
        const rightDiv = document.getElementById("rightpokemon");
        leftDiv.style.display = "block";
        rightDiv.style.display = "block";
        leftDiv.classList.remove("leftpokemonfight")
        rightDiv.classList.remove("rightpokemonfight")
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
    const typeLeft = leftPokemon.types[0].type.name;
    const typeRight = rightPokemon.types[0].type.name;
    setFightButton(false);
    const leftDiv = document.getElementById("leftpokemon");
    const rightDiv = document.getElementById("rightpokemon");

    rightDiv.className = "rightpokemonfight";
    leftDiv.className = "leftpokemonfight";

    setTimeout(() => {
      if (typeStrong[typeLeft].includes(typeRight)) {
        leftDiv.style.display = "none";
        rightDiv.style.display = "none";
        setWinner(leftPokemon)
      } else if (typeStrong[typeRight].includes(typeLeft)) {
        leftDiv.style.display = "none";
        rightDiv.style.display = "none";
        setWinner(rightPokemon)
      } else {
        leftDiv.style.display = "none";
        rightDiv.style.display = "none";
        setWinner("Empate")
      }
    }, 2000);
  }

  const pokemonFiltradosIzquierda = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(busquedaIzquierda.toLowerCase())
  );

  const pokemonFiltradosDerecha = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(busquedaDerecha.toLowerCase())
  );

  const FightButton = () => {
    return (
      <img src={fightImage} id="fightbutton" onClick={handleFight} />
    )
  }


  return (
    <>
      <h1>¿Quién ganará?</h1>
      <section className="fight">

        <div className="left">
          <div className="buscador">
            <input
              type="text"
              placeholder="Buscar Pokémon"
              value={busquedaIzquierda}
              onChange={(e) => setBusquedaIzquierda(e.target.value)}
            />
          </div>
          <ul>
            {pokemonFiltradosIzquierda.map((pokemon, index) => (
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
          </div>
        </div>
        <div className="mid">
          {leftPokemon && rightPokemon && winner !== "Empate" && fightButton && (
            <FightButton />
          )}
          {winner && winner !== "Empate" && (
            <div className="winner">
              {winner.sprites.front_default && (
                <img src={winner.sprites.front_default} alt="" />
              )}
              <p>{winner.name}</p>
            </div>
          )}
          {winner && winner === "Empate" && (
            <p className="winner empate">Empate</p>
          )}
        </div>
        <div className="right">
          <div className="buscador">
            <input
              type="text"
              placeholder="Buscar Pokémon"
              value={busquedaDerecha}
              onChange={(e) => setBusquedaDerecha(e.target.value)}
            />
          </div>
          <ul>
            {pokemonFiltradosDerecha.map((pokemon, index) => (
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