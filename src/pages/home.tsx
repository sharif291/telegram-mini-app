import { useEffect, useState } from "react";
import PairSelection from "../components/PairSelection";
import AmountSelection from "../components/AmountSelection";
import DirectionSelection from "../components/DirectionSelection";
import PredictionComponent from "../components/PredictionComponent";
import PrimaryButton from "../components/Button/PrimaryButton";

function home() {
  const [loading, setLoading] = useState(false);
  const [runPrediction, setRunPrediction] = useState(false);
  const toogleRunPrediction = () => {
    setRunPrediction(!runPrediction);
  };
  return (
    <div className="max-w-[400px] w-[300px] mt-6 p-2">
      {runPrediction ? (
        <PredictionComponent
          toogleRunPrediction={toogleRunPrediction}
        ></PredictionComponent>
      ) : (
        <>
          <PairSelection></PairSelection>
          <AmountSelection></AmountSelection>
          <DirectionSelection></DirectionSelection>
          <PrimaryButton
            text={loading ? "Loading..." : "Submit"}
            isDisble={loading}
            buttonHandler={() => {
              // setLoading(true);
              setRunPrediction(true);
              console.log("submit");
            }}
          ></PrimaryButton>
        </>
      )}
    </div>
  );
}

export default home;
