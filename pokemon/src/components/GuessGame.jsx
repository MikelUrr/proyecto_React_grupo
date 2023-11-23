// Pokedex.js
import React, { useState, useEffect } from 'react';

const GuessGame = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [error, setError] = useState("");
  const [correctPokemonSprite, setCorrectPokemonSprite] = useState("")
  const [correctPokemonName, setCorrectPokemonName] = useState("")
  const [wrongPokemons, setWrongPokemons] = useState([])
  const [inputValue, setInputValue] = useState('');
  const [gameResult, setGameResult] = useState(null);


  useEffect(() => {
    getCorrectPokemon();
  }, [])



  const getCorrectPokemon = async () => {
    try {
      const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 384) + 1}`)
      const results = await data.json();
      if (results.name)
        setCorrectPokemonSprite(results.sprites.front_default)
      setCorrectPokemonName(results.name)

    } catch (e) {
      setError("Algo salió mal");
      console.error(e);
    }
  }

  // Guardo este código por si algún día quiero hacer adivinar con 4 opciones
  /*   const getWrongPokemons = async () => {
      try {
        let wrongPokemons = []
        while (wrongPokemons.length < 4) {
          const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 151) + 1}`)
          const results = await data.json();
          const wrongPokemon = results.name
          if(wrongPokemons.includes(wrongPokemon)) {
            continue;
          } else {
            wrongPokemons.push(wrongPokemon)
          }
        }
        setWrongPokemons(wrongPokemons);
        console.log(wrongPokemons)
      } catch(e){
        setError("Algo salió mal");
        console.error(e);
      }
    } */

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sprite = document.getElementById("correctpokemon");
    sprite.className = "show"
    const formattedInputValue = inputValue.toLowerCase().replace(/[.\s]/g, '-');
    const formattedCorrectPokemonName = correctPokemonName.toLowerCase().replace('.', '-');

    if (
      formattedInputValue === formattedCorrectPokemonName ||
      (formattedInputValue === 'mr-mime' && formattedCorrectPokemonName === 'mr-mime') ||
      (formattedInputValue === 'nidoran' &&
        (formattedCorrectPokemonName === 'nidoran-f' || formattedCorrectPokemonName === 'nidoran-m'))
    ) {
      setGameResult('win');
      setTimeout(() => {
        sprite.className = "guess"
        getCorrectPokemon()
        sprite.className = "guess"
        setGameResult(null)
      }, 3000);
    } else {
      sprite.className = "show"
      setGameResult('lose');
      setTimeout(() => {
        sprite.className = "guess"
        getCorrectPokemon()
        setGameResult(null)
      }, 3000);
    }
    setInputValue('');
  }

  return (
    <>
      <section className="gamefield">
        <img id="correctpokemon" className="guess" src={correctPokemonSprite} />
        <form onSubmit={handleSubmit}>
          <input type="text" value={inputValue} onChange={handleInputChange} placeholder="¿Qué pokemon es?" />
        </form>
        {gameResult === 'win' && (
          <div className="acertaste">
            <p>Has acertado</p>
          </div>
        )}
        {gameResult === 'lose' && (
          <div className="fallaste">
            <p>Perdiste. El Pokemon era: {correctPokemonName}</p>
          </div>
        )}
      </section>
    </>
  );
};

export default GuessGame;