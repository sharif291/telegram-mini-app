import { useEffect } from "react";
import Timer from "./Timer";
import { useAppDispatch } from "../redux/hooks";
import { resetData } from "../redux/slices/dataSlice";

type PropTypes = {
  toogleRunPrediction: VoidFunction;
};

function PredictionComponent({ toogleRunPrediction }: PropTypes) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const id = setTimeout(() => {
      console.log("hello");
      dispatch(resetData());
      toogleRunPrediction();
    }, 7000);

    return () => {
      clearTimeout(id);
    };
  }, []);

  return (
    <div className=" p-2">
      <Timer></Timer>
      <div className="w-[230px] h-[150px] border-black p-2 border-[1px] m-auto mt-[20px] mb-[20px]">
        <p className=" text-left font-semibold text-2xl">Current Price</p>
        <div className="border-black p-2 border-[1px] bg-green-500 font-bold ">
          <span className="text-5xl">{25000} </span>
          {1 ? (
            <span className="text-5xl text-red-600">&uarr;</span>
          ) : (
            <span> &darr;</span>
          )}
        </div>
      </div>
      <p className="m-auto text-center w-fit border-black p-2 border-[1px] rounded-3xl">
        <span>Your Price:</span> <span className=" ml-5">{30000}</span>
      </p>
      <p className="m-auto w-fit border-black p-2 border-[1px] rounded-3xl mt-5">
        Potential Win:<span className="ml-5">{5}USD</span>
      </p>
    </div>
  );
}

export default PredictionComponent;
