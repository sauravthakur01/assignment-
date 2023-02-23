import React, { useEffect, useState } from "react";
import SingleCharacter from "./SingleCharacter";
import classes from "./character.module.css";

const Character = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((data) => setCharacters(data.results))
      .catch((err) => console.log(err));
  }, []);

  return (
    //{ grid should be applied on this div}
    <div>
      {characters.map((character) => (
        <SingleCharacter key={character.id} character={character} />
      ))}
    </div>
  );
};

export default Character;
