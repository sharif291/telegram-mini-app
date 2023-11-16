import { useEffect, useState } from "react";

function Timer({ amountOfTime }: { amountOfTime: number }) {
  const [counter, setCounter] = useState(amountOfTime);

  useEffect(() => {
    let timer: any;
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
