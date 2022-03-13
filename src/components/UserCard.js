import React from "react";
import classes from "./UserCard.module.css";

export default function UserCard(props) {
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
      </div>
    </div>
  );
}
