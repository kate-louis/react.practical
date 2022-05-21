import React, { useState } from 'react';
import { getInitialTileList } from '../util/tile';
import useMoveTile from '../hook/useMoveTile';
import Tile from './Tile';

export default function Game({ setScore }) {
  const [tileList, setTileList] = useState(getInitialTileList);
  // console.dir(tileList);

  // up, down. left, right
  useMoveTile({ tileList, setTileList, setScore });
  console.log('Game');
  return (
    <div className="game-container">

      <div className="grid-container">
        {new Array(4).fill(0).map((_, rowIdx) => (
          <div className="grid-row" key={rowIdx+1}>
            {new Array(4).fill(0).map((_, cellIdx) => (
              <div className="grid-cell" key={`${rowIdx+1}${cellIdx+1}`}>{`${rowIdx+1}${cellIdx+1}`}</div>
            ))}
          </div>
        ))}
      </div>

      <div className="tile-container">
        {tileList.map(item =>
          <Tile key={item.id } {...item} />
        )}
      </div>

    </div>
  );
}
