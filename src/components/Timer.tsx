import { useEffect, useState } from "react";

function Timer() {
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    let timer: number;
    if (counter > 0) timer = setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <div className="App">
      <div>Time Remaining: {counter} Seconds</div>
    </div>
  );
}

export default Timer;
