import "./Menu.scss";
function Menu() {
  return (
    <div className="menu">
      <div className="menu__container">
        <img src="img/logo_text.png" alt="logo" className="menu__img" />
      </div>
      <div className="menu__container menu__container--text">
        <h3 className="menu__text ">Reset Positions</h3>
        <h3 className="menu__text ">New Game</h3>
        <h3 className="menu__text ">Change Player</h3>
      </div>
    </div>
  );
}

export default Menu;
