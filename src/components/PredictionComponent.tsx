import { useEffect, useState } from "react";
import Timer from "./Timer";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { resetData, state } from "../redux/slices/dataSlice";
import axios from "axios";

// import { io } from "socket.io-client";
// const socket = io("wss://delayed.polygon.io/options");
// console.log(socket);

type PropTypes = {
  toogleRunPrediction: VoidFunction;
};

function PredictionComponent({ toogleRunPrediction }: PropTypes) {
  const [currentPrice, setCurrentPrice] = useState(0);
  const [predictedPrice, setPredictedPrice] = useState(0);
  const dispatch = useAppDispatch();
  const pair = useAppSelector(state).pair.name.split("/");
  const direction = useAppSelector(state).direction;
  const amount = useAppSelector(state).amount;
  const yesterdayDate = new Date(Date.now() - 86400000)
    .toISOString()
    .split("T")[0];
  console.log(yesterdayDate);
  useEffect(() => {
    axios
      .get(
        `https://api.polygon.io/v1/open-close/crypto/${pair[0]}/${pair[1]}/${yesterdayDate}?adjusted=true&apiKey=fpUJXdyu7Fq7ogCphUtxMpT8_0loGPLN`
      )
      .then((res) => {
        if (res.data.close) {
          setCurrentPrice(res.data.close);
          if (direction == "UP")
            setPredictedPrice(parseFloat(res.data.close) + amount);
          else setPredictedPrice(res.data.close - amount);
        }
      });
    const updateData = setTimeout(() => {
      axios
        .get(
          `https://api.polygon.io/v1/open-close/crypto/${pair[0]}/${pair[1]}/${yesterdayDate}?adjusted=true&apiKey=fpUJXdyu7Fq7ogCphUtxMpT8_0loGPLN`
        )
        .then((res) => {
          if (res.data.close) {
            setCurrentPrice(res.data.close);
          }
        });
    }, 20000);
    const _resetData = setTimeout(() => {
      dispatch(resetData());
      toogleRunPrediction();
    }, 30000);

    return () => {
      clearTimeout(updateData);
      clearTimeout(_resetData);
    };
  }, []);

  return (
    <div className=" p-2">
      <Timer amountOfTime={10}></Timer>
      <div className="w-[300px] h-[150px] border-black p-2 border-[1px] m-auto mt-[20px] mb-[20px]">
        <p className=" text-left font-semibold text-2xl">
          Current Price(yesterday's close)
        </p>
        <div className="border-black p-2 border-[1px] bg-green-500 font-bold ">
          <span className="text-5xl">{currentPrice} </span>
          {direction == "UP" ? (
            <span className="text-5xl text-red-600">&uarr;</span>
          ) : (
            <span className="text-5xl text-red-600">&darr;</span>
          )}
        </div>
      </div>
      <p className="m-auto text-center w-fit border-black p-2 border-[1px] rounded-3xl">
        <span>Your Price:</span>{" "}
        <span className=" ml-5">{predictedPrice} USD</span>
      </p>
      <p className="m-auto w-fit border-black p-2 border-[1px] rounded-3xl mt-5">
        Potential Win:
        <span className="ml-5">
          {Math.abs(predictedPrice - currentPrice)} USD
        </span>
      </p>
    </div>
  );
}

export default PredictionComponent;
