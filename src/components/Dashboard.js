import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import classes from "./Dashboard.module.css";
import SpotifyWebApi from "spotify-web-api-node";
import ArtistItem from "./ArtistItem";
import UserCard from "./UserCard";

const spotifyApi = new SpotifyWebApi({
  clientId: "dd073909aeb9469599413918e7095297",
});

export default function Dashboard(props) {
  const [topArtists, setTopArtists] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [shortClass, setShortClass] = useState(true);
  const [midClass, setMidClass] = useState(false);
  const [longClass, setLongClass] = useState(false);
  const accessToken = useAuth(props.code);

  const customClass = `${classes.option} ${classes.active}`;

  const shortTerm = (event) => {
    spotifyApi.getMyTopArtists({ time_range: "short_term" }).then((res) => {
      setTopArtists(res.body.items);
    });
    setShortClass(true);
    setMidClass(false);
    setLongClass(false);
  };

  const midTerm = (event) => {
    spotifyApi.getMyTopArtists({ time_range: "medium_term" }).then((res) => {
      setTopArtists(res.body.items);
    });
    setShortClass(false);
    setMidClass(true);
    setLongClass(false);
  };

  const longTerm = (event) => {
    spotifyApi.getMyTopArtists({ time_range: "long_term" }).then((res) => {
      setTopArtists(res.body.items);
    });
    setShortClass(false);
    setMidClass(false);
    setLongClass(true);
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    shortTerm();
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.getMe().then((res) => {
      console.log(res);
      setUserInfo({
        name: res.body.display_name,
        followers: res.body.followers.total,
        avatar: res.body.images[0].url,
      });
    });
  }, [accessToken]);

  return (
    <div className={classes.container}>
      <UserCard name={userInfo.name} followers={userInfo.followers} avatar={userInfo.avatar} />
      <div className={classes.card}>
        <div className={classes.header}>
          <div
            onClick={shortTerm}
            className={shortClass ? customClass : classes.option}
          >
            <p>Last Month</p>
          </div>
          <div
            onClick={midTerm}
            className={midClass ? customClass : classes.option}
          >
            <p>Last 6 Months</p>
          </div>
          <div
            onClick={longTerm}
            className={longClass ? customClass : classes.option}
          >
            <p>All Time</p>
          </div>
        </div>
        <div className={classes.list}>
          <ul>
            {topArtists.map((artist) => (
              <ArtistItem
                key={artist.id}
                name={artist.name}
                src={artist.images[0].url}
                genre={artist.genres[0]}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
