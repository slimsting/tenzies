import "./Die.css";
export default function Die({ value, holdDice, isHeld}) {
  const style = {
    backgroundColor: isHeld && "#59E391",
  };
  return (
    <div className="die" style={style} onClick={holdDice}>
      {value}
    </div>
  );
}
