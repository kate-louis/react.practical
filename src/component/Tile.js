import React from "react";

export default function Tile({ id, x, y, value, isMerged, isNew }) {
  return (
    <div className={`tile tile-${value} tile-position-${x}-${y} ${isMerged ? 'tile-merged' : ''} ${isNew ? 'tile-new' : ''}`} key={id}>
      <div className="tile-inner">{value}</div>
    </div>
  );
}
