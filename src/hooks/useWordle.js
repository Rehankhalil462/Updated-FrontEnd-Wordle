import React, { useState } from "react";

export const useWordle = () => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  // format a guess into an array of letter of objects
  /// e.g [{key:'a' , color :'yellow'}]
  const formatGuess = () => {};
  const addNewGuess = () => {};
  const handleKeyUp = () => {};
  return { turn, currentGuess, guesses, isCorrect, handleKeyUp };
};

const array = ["abcd", "efgh"];

array[2] = "abcd";
console.log(array);
