import React from "react";
import classes from "./TrackItem.module.css";

export default function TrackItem(props) {
  return (
    <li className={classes.item}>
      <div className={classes.id}>
        <p>{props.index + 1}</p>
      </div>
      <div className={classes["item-container"]}>
        <div className={classes.info}>
          <div className={classes["name-container"]}>
            <div className={classes.name}>
              <p>{props.name}</p>
            </div>
            {props.explicit && <p className={classes.explicit}>EXPLICIT</p>}
          </div>
          <div className={classes.additional}>
            <p className={classes.album}>
              {props.artist} <span className={classes.break}>-</span>{" "}
              {props.album}
            </p>
          </div>
        </div>
        <img className={classes.image} alt={props.name} src={props.image} />
      </div>
    </li>
  );
}
