import { useState } from "react";
import "./Card.scss";
function Card({ cardData, pickHandler, flip, disabled }) {
  //const [style, setStyle] = useState("card__inner");
  //const [flip, setFlip] = useState(true);

  //------------------------------------------------------

  //Click de las cartas: las gira
  const clickHandler = (e) => {
    //setFlip(!flip);
    //flip ? setStyle("card__inner card--click") : setStyle("card__inner");
    //console.log("flip");
    // if (!allowFlip) return;
    //setStyle("card__inner card--click");
    if (disabled) return;
    if (flip) return;
    pickHandler(cardData);
  };

  return (
    <div className="card" onClick={clickHandler}>
      <div className={flip ? "card__inner card--click" : "card__inner"}>
        <div className="card__container card__back">
          <img src="img/card_back.jpg" className="card__img card__img--back" />
        </div>
        <div className="card__container card__front">
          <img
            src={"img/backgrounds/" + cardData.imgBackground}
            className="card__img"
          />
          {/* <p className="card__name">{cardData.name}</p> */}
          {console.log(
            cardData.name,
            cardData.size
              ? cardData.size.width
                ? cardData.size.width
                : "2"
              : ""
          )}
          <img
            src={"img/pokemon/" + cardData.img}
            className="card__img card__pokemon"
            style={{
              width: cardData.size?.width || "70%",
              height: cardData.size?.height || "70%",
              marginTop: cardData.margin?.top || "0",
              marginLeft: cardData.margin?.left || "0",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
