import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });
  console.log(`https://www.youtube.com/embed/${apiData.key}`);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setApiData(res.results[0]);
      })
      .catch((err) => console.error(err));
    console.log(`https://www.youtube.com/embed/${apiData.key}`);
  }, []);

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt=""
        onClick={() => {
          navigate(-2);
        }}
      />
      <iframe
        key={apiData.key}
        src={`https://www.youtube-nocookie.com/embed/${apiData.key}?autoplay=0&controls=1&rel=0&modestbranding=1&disablekb=1&iv_load_policy=3`}
        title="Trailer"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        sandbox="allow-scripts allow-same-origin allow-presentation"
        loading="lazy"
        width="90%"
        height="90%"
        style={{
          borderRadius: "12px",
          overflow: "hidden",
        }}
      ></iframe>
      {/* <iframe
        key={apiData.key}
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
        width="90%"
        height="90%"
      ></iframe> */}
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
