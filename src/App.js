import item from "./item.png";
import "./App.css";
import { useRef, useState } from "react";

const WRAPPER__SIZE = 250;
const innerHeight = window.innerHeight - WRAPPER__SIZE;
const innerWidth = window.innerHeight - WRAPPER__SIZE;
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function App() {
  const phobicRef = useRef(null);
  const [caughtTimes, setCaughtTimes] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  // let prevTop = 0;
  // let prevLeft = 0;

  const handlePositionUpdate = (top, left) => {
    // console.log(`top, left`, top, left);
    phobicRef.current.style.top = `${top}px`;
    phobicRef.current.style.left = `${left}px`;
  };

  const regenerateItem = () => {
    phobicRef.current.style.height = "0px";
    phobicRef.current.style.width = "0px";
    setTimeout(() => {
      phobicRef.current.style.height = `${WRAPPER__SIZE}px`;
      phobicRef.current.style.width = `${WRAPPER__SIZE}px`;
      phobicRef.current.style.top = `${randomIntFromInterval(
        0,
        innerHeight
      )}px`;
      phobicRef.current.style.left = `${randomIntFromInterval(
        0,
        innerWidth
      )}px`;
    }, 1500);
  };

  const handleMouseEnter = (evt) => {
    const mouseTop = evt.clientX;
    const mouseLeft = evt.clientY;
    const randomTop = randomIntFromInterval(0, innerHeight);
    const randomLeft = randomIntFromInterval(0, innerWidth);
    if (
      mouseTop >= randomTop &&
      mouseTop <= randomTop + WRAPPER__SIZE &&
      mouseLeft >= randomLeft &&
      mouseLeft <= randomLeft + WRAPPER__SIZE
    ) {
      setCaughtTimes((prev) => prev + 1);
      setGameOver(true);
      regenerateItem();
      setTimeout(() => {
        setGameOver(false);
      }, 1000);
    } else {
      handlePositionUpdate(randomTop, randomLeft);
    }
  };

  return (
    <div className="App">
      <p className="App__score">Killed {caughtTimes} Times</p>
      <div
        className="App__phobicWrapper"
        ref={phobicRef}
        onMouseEnter={handleMouseEnter}
      >
        <img
          src={item}
          className="App-logo App__phobic--img"
          alt="logo"
          onMouseEnter={handleMouseEnter}
        />
      </div>
      {gameOver && (
        <div className="App__GameOver">
          <p className="title"> 😈 Corona Killed 🔪 Score: {caughtTimes}</p>
        </div>
      )}
    </div>
  );
}

export default App;
