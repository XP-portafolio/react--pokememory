import "./Info.scss";
function Info({ turnsCount, playerName, ranking }) {
  return (
    <div className="info">
      <div className="info__container info__container--title">
        <h2 className=" info__text info__text--title">Player</h2>
      </div>
      <div className="info__container">
        <h3 className="info__text info__text--name">Nombre:</h3>
        <h3 className="info__text info__text--data">{playerName}</h3>
      </div>

      <div className="info__container">
        <h3 className="info__text info__text--name">Turnos:</h3>
        <h3 className="info__text info__text--data">{turnsCount}</h3>
      </div>
      <div className="info__container info__container--title">
        <h2 className="info__text info__text--title">Top 10</h2>
      </div>
      <div className="info__container info__container--ranking">
        {ranking.map((x, i) => (
          <div key={i} className="info__container">
            <h3 className="info__text info__text--name">{x.name}</h3>
            <h3 className="info__text info__text--data">{x.score}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Info;
