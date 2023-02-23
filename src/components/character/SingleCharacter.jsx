import React, { useState } from "react";
import classes from "./singleCharacter.module.css";

const SingleCharacter = (props) => {
  const [episodes, setEpisodes] = useState([]);
  const [resident, setResident] = useState(undefined);

  const clickHandler = () => {
    const episodeArr = props.character.episode;

    Promise.all(episodeArr.map((url) => fetch(url)))
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((data) => setEpisodes(data.map((d) => d.name)))
      .catch((err) => console.log(err));
  };

  const residentHandler = () => {
    fetch(props.character.origin.url)
      .then((res) => res.json())
      .then((data) => setResident(data))
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.container}>
      <h2>{props.character.name}</h2>
      <img src={props.character.image} />
      <h3>{props.character.status}</h3>
      <h4>{props.character.species}</h4>
      <h5>{props.character.gender}</h5>
      <p>
        <button onClick={residentHandler}>{props.character.origin.name}</button>
        {!!resident && resident.residents.length}
      </p>
      <button onClick={clickHandler}>Episodes featured</button>

      {episodes.length > 0 && (
        <div onClick={() => setEpisodes([])}>
          {episodes.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleCharacter;
