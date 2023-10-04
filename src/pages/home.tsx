import { useState } from "react";
import PairSelection from "../components/PairSelection";
import AmountSelection from "../components/AmountSelection";
import DirectionSelection from "../components/DirectionSelection";
import PredictionComponent from "../components/PredictionComponent";
import PrimaryButton from "../components/Button/PrimaryButton";

import {
  TonConnectButton,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";

function home() {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const [loading] = useState(false);
  const [runPrediction, setRunPrediction] = useState(false);
  const toogleRunPrediction = () => {
    setRunPrediction(!runPrediction);
  };

  const myTransaction = {
    validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
    messages: [
      {
        address: "EQCJnYQhJs8Siz5Q4H-7ghHdNChcfcwofhv8ni1zb-xq9MK7",
        amount: "11111",
      },
    ],
  };

  return (
    <div className="max-w-[400px] w-[300px] mt-6 p-2">
      <div className=" m-auto">
        <TonConnectButton style={{ margin: "auto" }} />
      </div>
      {wallet?.account?.address && (
        <PrimaryButton
          text={"Send transaction"}
          isDisble={false}
          buttonHandler={() => {
            tonConnectUI.sendTransaction(myTransaction);
          }}
        ></PrimaryButton>
      )}

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
