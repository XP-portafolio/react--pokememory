import "./Grid.scss";
import Game from "../game/Game";
import Info from "../info/Info";
import { useEffect, useState } from "react";

function Grid() {
  const [turnsCount, setTurnsCount] = useState(0);
  const [playerName, setPlayerName] = useState("XP");
  const [ranking, setRanking] = useState([]);

  const updateRanking = (score) => {
    setRanking(
      ranking
        .concat({ name: playerName, score: score })
        .sort((a, b) => a.score - b.score)
    );
    //setRanking((r) => r.sort((a, b) => a - b));
  };

  return (
    <div className="grid">
      <Game
        setTurnsCount={setTurnsCount}
        updateRanking={updateRanking}
        playerName={playerName}
      ></Game>
      <Info
        turnsCount={turnsCount}
        playerName={playerName}
        ranking={ranking}
      ></Info>
    </div>
  );
}
export default Grid;
