import React from "react";
import classes from "./UserCard.module.css";

export default function UserCard(props) {
  const year = new Date().getFullYear();
  return (
    <div className={classes.card}>
      <div className={classes.header}>
        <img className={classes.avatar} alt="avatar" src={props.avatar} />
        <h1>
          Hello <span className={classes.name}>{props.name}</span> !
        </h1>
      </div>
      <div className={classes.content}>
        <div className={classes.followers}>
          <h2>Total Followers</h2>
          <p>{props.followers}</p>
        </div>
        <div className={classes.followers}>
          <h2>Total Followed Artists</h2>
          <p>{props.totalArtists}</p>
        </div>
      </div>
      <p className={classes.copy}>Hubert Madej &#169; {year}</p>
    </div>
  );
}
