import React from "react";
import classes from "./ArtistItem.module.css";

export default function ArtistItem(props) {
  return (
    <li className={classes.item}>
      <div className={classes.id}>
        <p>{props.index + 1}</p>
      </div>
      <div className={classes["item-container"]}>
        <div className={classes.info}>
          <p className={classes.name}>{props.name}</p>
          <p className={classes.genre}>{props.genre}</p>
        </div>
        <img className={classes.image} alt={props.name} src={props.src} />
      </div>
    </li>
  );
}
