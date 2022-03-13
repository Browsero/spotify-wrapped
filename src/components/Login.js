import React from "react";
import classes from "./Login.module.css";
import { RiSpotifyLine } from "react-icons/ri";

const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "dd073909aeb9469599413918e7095297";
const scopes = [
  "user-top-read",
  "user-follow-read",
  "user-read-recently-played",
  "streaming",
];
const redirectUri = "http://localhost:3000";
const AUTH_DATA = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=code&`;

export default function Login() {
  return (
    <div className={classes.container} data-aos="zoom-in">
      <div className={classes.header}>
        <h1>
          Your personal <span className={classes.name}>Spotify</span> summary
        </h1>
      </div>
      <div className={classes["login-card"]}>
        <div className={classes["button-container"]}>
          <div className={classes.icon}>
            <RiSpotifyLine />
          </div>
          <a className={classes.btn} href={AUTH_DATA}>
            Login with Spotify
          </a>
        </div>
      </div>
    </div>
  );
}
