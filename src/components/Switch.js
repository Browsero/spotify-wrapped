import React from "react";
import classes from "./Switch.module.css";

export default function Switch(props) {
  return (
    <div className={classes.switch}>
      <div onClick={props.artistsHandler} className={classes.firstOption}>
        <p>Top Artists</p>
      </div>
      <div onClick={props.tracksHandler} className={classes.secondOption}>
        <p>Top Tracks</p>
      </div>
    </div>
  );
}
