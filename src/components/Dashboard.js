import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import classes from "./Dashboard.module.css";
import SpotifyWebApi from "spotify-web-api-node";
import ArtistItem from "./ArtistItem";
import UserCard from "./UserCard";
import Switch from "./Switch";
import TrackItem from "./TrackItem";

const spotifyApi = new SpotifyWebApi({
  clientId: "dd073909aeb9469599413918e7095297",
});

export default function Dashboard(props) {
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [shortClass, setShortClass] = useState(true);
  const [midClass, setMidClass] = useState(false);
  const [longClass, setLongClass] = useState(false);
  const [renderTracks, setRenderTracks] = useState(false);
  const accessToken = useAuth(props.code);

  const customClass = `${classes.option} ${classes.active}`;

  const artistsHandler = () => {
    setRenderTracks(false);
  };

  const tracksHandler = () => {
    setRenderTracks(true);
  };

  const shortTerm = (event) => {
      spotifyApi.getMyTopArtists({ time_range: "short_term" }).then((res) => {
        setTopArtists(res.body.items);
      });
      spotifyApi.getMyTopTracks({ time_range: "short_term" }).then((res) => {
        console.log(res.body.items);
        setTopTracks(res.body.items);
      });
    setShortClass(true);
    setMidClass(false);
    setLongClass(false);
  };

  const midTerm = (event) => {
    spotifyApi.getMyTopArtists({ time_range: "medium_term" }).then((res) => {
      setTopArtists(res.body.items);
    });
    spotifyApi.getMyTopTracks({ time_range: "medium_term" }).then((res) => {
      setTopTracks(res.body.items);
    });
    setShortClass(false);
    setMidClass(true);
    setLongClass(false);
  };

  const longTerm = (event) => {
    spotifyApi.getMyTopArtists({ time_range: "long_term" }).then((res) => {
      setTopArtists(res.body.items);
    });
    spotifyApi.getMyTopTracks({ time_range: "long_term" }).then((res) => {
      setTopTracks(res.body.items);
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
    let new_user;
    spotifyApi.getMe().then((res) => {
      new_user = {
        name: res.body.display_name,
        followers: res.body.followers.total,
        avatar: res.body.images[0].url,
      };
      spotifyApi.getFollowedArtists({ limit: 1 }).then((res) => {
        new_user = {
          ...new_user,
          totalArtists: res.body.artists.total,
        };
        setUserInfo(new_user);
      });
    });
  }, [accessToken]);

  return (
    <div className={classes.container}>
      <UserCard
        name={userInfo.name}
        followers={userInfo.followers}
        avatar={userInfo.avatar}
        totalArtists={userInfo.totalArtists}
      />
      <Switch artistsHandler={artistsHandler} tracksHandler={tracksHandler} />
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
          {!renderTracks ? (
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
          ) : (
            <ul>
              {topTracks.map((track) => (
                <TrackItem 
                key={track.id}
                name={track.name}
                album={track.album.name}
                artist={track.album.artists[0].name}
                explicit={track.explicit}
                image={track.album.images[0].url}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
