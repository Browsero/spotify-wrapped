import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import classes from "./Dashboard.module.css";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "dd073909aeb9469599413918e7095297",
});

export default function Dashboard(props) {
  const [topArtists, setTopArtists] = useState([]);
  const accessToken = useAuth(props.code);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.getMyTopArtists().then((res) => {
      setTopArtists(res.body.items);
    });
  }, [accessToken]);

  return (
    <div>
      <ul>
        {topArtists.map((artist) => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </div>
  );
}
