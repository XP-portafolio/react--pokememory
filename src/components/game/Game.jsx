import "./Game.scss";
import Card from "../card/Card";
import { types } from "../../data/types.json";
import { pokemon } from "../../data/pokemon.json";
import { useEffect, useState } from "react";
function Game({ setTurnsCount, updateRanking, playerName }) {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstPick, setFirstPick] = useState(null);
  const [secondPick, setSecondPick] = useState(null);
  const [disabled, setDisable] = useState(false);
  //función para obtener 10 tipos de pokemons al azar (son 18)
  //se mostrará siempre 1 pokemon por tipo
  const shuffle = () => {
    const data = [];
    for (let i = 0; i < 10; i++) {
      let filteredTypes = types.filter((x) => !data.includes(x));
      let index = Math.floor(Math.random() * filteredTypes.length);
      data.push(filteredTypes[index]);
    }
    //console.log(data);
    return data;
  };
  //-------------------------------------------------------------------
  //función para escoger un pokemon por tipo
  const shufflePokemon = (type) => {
    const filteredPokemon = pokemon.filter((x) => x.type == type.toLowerCase());
    const index = Math.floor(Math.random() * filteredPokemon.length);
    let data = filteredPokemon[index];
    //console.log(type);
    data.imgBackground = data.type + ".png";
    return data;
  };
  //-------------------------------------------------------------------
  ///estadisticas de pokemon
  const estadisticas = () => {
    const data = pokemon.reduce((acc, e) => {
      acc[e.type] ? (acc[e.type] += 1) : (acc[e.type] = 1);
      return acc;
    }, {});
    return data;
  };
  //-------------------------------------------------------------------
  //test pokemons
  const obtenerTestPokemon = (inicio) => {
    let r = pokemon.slice(inicio, inicio + 10);
    r.forEach((x) => (x.imgBackground = x.type + ".png"));
    return r;
  };
  //-------------------------------------------------------------------
  //obtener un arreglo de pokemons para enviar en parejas de Card
  const initGame = () => {
    console.log("initGame");
    console.log("estadisticas:", estadisticas());
    // console.log(pokemon.map((x) => x.type));
    const selectedTypes = shuffle(types);
    let pokemonData = selectedTypes.map((x) => shufflePokemon(x));
    //generar las 20 cartas en orden aleatorio
    //****************************************TEST****************************** */
    pokemonData = obtenerTestPokemon(200);
    console.log(pokemonData);
    //************************************************************************ */
    pokemonData = [...pokemonData, ...pokemonData]
      .sort(() => Math.random() - 0.5)
      .map((x, i) => ({ ...x, id: i }));

    //console.log("cardData", pokemonData);
    setCards(pokemonData);
    setTurnsCount(0);
    setTurns(0);
    setFirstPick(null);
    setSecondPick(null);
  };
  //------------------------------------------------------------------
  //carga inicial
  useEffect(() => {
    initGame();
  }, []);
  //*****************************************************************/
  //lógica del juego
  //------------------------------------------------------------------
  //cuando se elige una carta, se guarda la elección
  const pickHandler = (cardData) => {
    firstPick ? setSecondPick(cardData) : setFirstPick(cardData);
  };
  //-----------------------------------------------------------------
  //lógica para revisar las elecciones (si son iguales o distintas)
  useEffect(() => {
    if (firstPick && secondPick) {
      setTurns((turns) => turns + 1);
      setDisable(true);
      if (secondPick.name === firstPick.name) {
        console.log("ok");
        setCards((cards) =>
          cards.map((c) => {
            if (c.name === firstPick.name) {
              return { ...c, flip: true };
            } else {
              return c;
            }
          })
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [firstPick, secondPick]);
  //------------------------------------------------------------
  //resetear turno para elegir dos nuevas cartas y se suma los turnos
  const resetTurn = () => {
    setFirstPick(null);
    setSecondPick(null);
    setDisable(false);
  };
  //-------------------------------------------------------------
  //mostrar los turnos
  useEffect(() => {
    //para eviar al cargar que se cumpla 100% flip con 0 cartas
    if (cards.length == 0) return;

    if (cards.every((x) => x.flip)) {
      //win
      console.log("WIN in " + turns + " Turns");
      updateRanking(turns);
      setTimeout(() => initGame(), 2000);
    }
    setTurnsCount(turns);
  }, [turns]);

  //-------------------------------------------------------------------

  return (
    <div className="game">
      {cards.map((c) => (
        <Card
          key={c.id}
          cardData={c}
          pickHandler={pickHandler}
          flip={c == firstPick || c == secondPick || c.flip || true}
          disabled={disabled}
        />
      ))}
    </div>
  );
}

export default Game;
