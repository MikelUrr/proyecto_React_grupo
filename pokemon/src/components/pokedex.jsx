import { useState,useEffect } from 'react'


const getGenerations = async () => {
    try {
      const pokemonData = await fetch('https://pokeapi.co/api/v2/generation/');
      const result = await pokemonData.json();
      const generations = result.results; 
      console.log(generations);
      
    } catch (error) {
      console.error("Algo ha salido mal...", error);
      setError("Algo ha salido mal...");
    }
  };
  
  useEffect(() => {
    getGenerations
  }, []);