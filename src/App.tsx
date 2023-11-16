import { useState } from "react";

import "./App.css";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import SearchableDropdown from "./components/SearchbleDropdown";
import { useEffect } from "react";
import upArrow from "../public/up-arrow.png";
import downArrow from "../public/down-arrow.png";
import dollarStruc from "../public/Frame 1.png";
import PoutingFace from "../public/Pouting Face.png";
import Timer from "./components/Timer";
import { websocketClient } from "@polygon.io/client-js";

function App() {
  const wallet = useTonWallet();
  const [bg, setBg] = useState("bg-blue");
  const [pair, setPair] = useState<string | null>(null);
  const [amount, setAmount] = useState(null);
  const [direction, setDirection] = useState<string | null>(null);
  const [stage, setStage] = useState<string | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [currentPriceAfterTime, setCurrentPriceAfterTime] = useState(null);
  useEffect(() => {
    if (direction == "UP") {
      setBg("bg-green");
    }
    if (direction == "DOWN") {
      setBg("bg-red");
    }
  }, [direction]);

  const submitHandler = () => {
    console.log("submit");
    setStage("PREDICTION");
    setBg("bg-black");
    // current price
    // predicted price
    // current price after 10s
  };
  useEffect(() => {
    if (stage == "PREDICTION") {
      const cryptoWS = websocketClient(
        "a6JcpKT2gWKMOcNjLTQt9YX4U5RbN81J"
      ).crypto();

      cryptoWS.onmessage = ({ data }: { data: any }) => {
        const [message] = JSON.parse(data);
        cryptoWS.send(
          `{ "action": "subscribe", "params": "XT.X:${pair?.split("/")[0]}-${
            pair?.split("/")[1]
          }" }`
        );
        switch (message.ev) {
          case "XT":
            console.log("price", message.p, currentPrice);
            if (currentPrice == null) {
              setCurrentPrice(message.p);
            }
            if (direction == "UP" && amount != null && predictedPrice == null)
              setPredictedPrice(parseFloat(message.p) + amount);
            if (direction == "DOWN" && amount != null && predictedPrice == null)
              setPredictedPrice(parseFloat(message.p) + amount);
            cryptoWS.close();
            break;
          case "A":
            // your trade message handler
            break;
        }
      };
    }
  }, [stage, currentPrice]);

  useEffect(() => {
    if (stage == "PREDICTION") {
      let pp: number;
      const cryptoWS2 = websocketClient(
        "a6JcpKT2gWKMOcNjLTQt9YX4U5RbN81J"
      ).crypto();

      cryptoWS2.onmessage = ({ data }: { data: any }) => {
        const [message] = JSON.parse(data);
        cryptoWS2.send(
          `{ "action": "subscribe", "params": "XT.X:${pair?.split("/")[0]}-${
            pair?.split("/")[1]
          }" }`
        );
        switch (message.ev) {
          case "XT":
            console.log(
              "price after seconds",
              message.p,
              currentPriceAfterTime
            );
            setCurrentPriceAfterTime(message.p);
            pp = message.p;
            break;
          case "A":
            // your trade message handler
            break;
        }
      };
      // close socket after 10 s
      setTimeout(() => {
        cryptoWS2.close();
        setStage("DONE");
        setCurrentPrice(pp);
      }, 10 * 1000);
    }
  }, [stage]);

  return (
    <>
      <div className={`main-container ${bg} m-auto p-6`}>
        <div
          style={{
            margin: "auto",
          }}
        >
          <div className="m-auto pt-[30px] pb-10">
            <TonConnectButton className="connect-button" />
          </div>
          {wallet?.account?.address && (
            <p className=" text-white text-[32px] font-[500] text-center pb-10">
              Send Transaction
            </p>
          )}
          {stage == null ? (
            <>
              <div>
                <p className="text-[14px] font-[500] text-[#9691AC] pb-[16px]">
                  Select the pair you want to trade
                </p>
                <div>
                  <SearchableDropdown
                    isLoading={false}
                    allItem={[
                      { title: "BTC/USD", value: "BTC/USD" },
                      { title: "GBP/USD", value: "GBP/USD" },
                      { title: "EUR/USD", value: "EUR/USD" },
                    ]}
                    propsToShow={pair}
                    propsToSet={setPair}
                  ></SearchableDropdown>
                </div>
              </div>
              <div>
                <p className="text-[14px] font-[500] text-[#9691AC] pt-6 pb-[16px]">
                  Select the amount you want to trade
                </p>
                <div>
                  <SearchableDropdown
                    isLoading={false}
                    allItem={[
                      { title: "5", value: 5 },
                      { title: "10", value: 10 },
                      { title: "20", value: 20 },
                      { title: "100", value: 100 },
                      { title: "150", value: 150 },
                    ]}
                    propsToShow={amount}
                    propsToSet={setAmount}
                  ></SearchableDropdown>
                </div>
              </div>

              <div className="hide-scrollbar flex mt-6 overflow-scroll">
                {[
                  { title: "5", value: 5 },
                  { title: "10", value: 10 },
                  { title: "20", value: 20 },
                  { title: "100", value: 100 },
                  { title: "150", value: 150 },
                ].map((x) => (
                  <div
                    className={`amount-button ${
                      x.value == amount ? "bg-[#FEFD38]" : ""
                    }`}
                  >
                    <div
                      className={`${
                        x.value == amount ? "text-[#000]" : "text-[#FFFFFF]"
                      } text-[14px] font-[600] mr-2`}
                    >
                      ${x.title}
                    </div>
                    <div
                      className={`${
                        x.value == amount ? "text-[#000]" : "text-[#9691AC]"
                      } text-[14px] font-[600] mr-2`}
                    >
                      USD
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 h-[32px] flex pl-4 pr-4 pt-1 pb-1 justify-between items-center border border-[#564a76] rounded-[25px] text-[#9691AC] text-[14px] font-[600]">
                <div>Pay out:</div>
                <div className=" flex justify-center items-center">
                  <div className="mr-2 text-white">75%</div>
                  <div className="mr-2 text-[#FEFD38]">
                    ${amount ? amount * .75 : 0}
                  </div>
                  <div className="">USD</div>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-[#9691AC]">
                  Select the direction you want to trade
                </p>
                <div className="mt-6 flex justify-between items-center">
                  <div
                    className={`up-arrow-btn ${
                      direction == "UP"
                        ? " w-full"
                        : direction != null
                        ? "hidden"
                        : ""
                    }`}
                    onClick={() => {
                      setDirection("UP");
                    }}
                  >
                    <img className="m-auto" src={upArrow}></img>
                  </div>
                  <div
                    className={`down-arrow-btn ${
                      direction == "DOWN"
                        ? " w-full"
                        : direction != null
                        ? "hidden"
                        : ""
                    }`}
                    onClick={() => {
                      setDirection("DOWN");
                    }}
                  >
                    <img className="m-auto" src={downArrow}></img>
                  </div>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  {pair && amount && direction && (
                    <div className="submit-btn" onClick={submitHandler}>
                      Submit
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mt-10 mb-4 text-white">
                <Timer amountOfTime={10}></Timer>
              </div>
              <div className="current-price-container">
                <p className="text-[24px] font-[500] pb-2">Current Price</p>
                <div className="price">
                  <p className=" text-[48px] font-[500]">{currentPrice}</p>
                  <div>
                    <img
                      className={`m-auto ${
                        direction === "DOWN" ? "down" : "up"
                      }`}
                      src={direction === "DOWN" ? downArrow : upArrow}
                    ></img>
                  </div>
                </div>
              </div>
              <div className="mt-6 h-[48px] flex pl-4 pr-4 pt-1 pb-1 justify-between items-center border border-[#564a76] rounded-[25px] text-white text-[14px] font-[600]">
                <div>Your price:</div>
                <div className=" flex justify-center items-center">
                  <div className="mr-2 font-[400]">{predictedPrice}</div>
                  <div className="">USD</div>
                </div>
              </div>
              <div className="mt-2 h-[48px] flex pl-4 pr-4 pt-1 pb-1 justify-between items-center border border-[#564a76] rounded-[25px] text-white text-[14px] font-[600]">
                <div>Your position</div>
                <div className=" flex justify-center items-center">
                  <div className="">{direction}</div>
                </div>
              </div>
              {predictedPrice && currentPriceAfterTime && stage == "DONE" && (
                <>
                  {currentPriceAfterTime > predictedPrice ? (
                    <div className="mt-2 h-[48px] flex pl-4 pr-4 pt-1 pb-1 justify-between items-center border border-[#564a76] rounded-[25px] text-white text-[14px] font-[600]">
                      <div className="flex justify-center items-center">
                        <img className="ml-[-18px]" src={dollarStruc}></img>
                        <p className="ml-2">Potential win:</p>
                      </div>
                      <div className=" flex justify-center items-center">
                        <div className="">{amount} USD</div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 h-[48px] flex pl-4 pr-4 pt-1 pb-1 justify-between items-center border border-[#564a76] rounded-[25px] text-white text-[14px] font-[600]">
                      <div className="flex justify-center items-center">
                        <img className="ml-[-18px]" src={PoutingFace}></img>
                        <p className="ml-2">Potential loss:</p>
                      </div>
                      <div className=" flex justify-center items-center">
                        <div className="">-{amount} USD</div>
                      </div>
                    </div>
                  )}
                  <p
                    className="m-auto text-center mt-10 bg-[white] w-[200px] p-4"
                    onClick={() => {
                      console.log("Reset State");
                      setBg("bg-blue");
                      setPair(null);
                      setAmount(null);
                      setDirection(null);
                      setStage(null);
                      setCurrentPrice(null);
                      setPredictedPrice(null);
                      setCurrentPriceAfterTime(null);
                    }}
                  >
                    Play Again
                  </p>
                </>
              )}
              {/* <div className="mt-2 h-[48px] flex pl-4 pr-4 pt-1 pb-1 justify-between items-center border border-[#564a76] rounded-[25px] text-white text-[14px] font-[600]">
                <div className="flex justify-center items-center">
                  <img className="ml-[-18px]" src={dollarStruc}></img>
                  <p className="ml-2">Potential win:</p>
                </div>
                <div className=" flex justify-center items-center">
                  <div className="">5 USD</div>
                </div>
              </div>
              <div className="mt-2 h-[48px] flex pl-4 pr-4 pt-1 pb-1 justify-between items-center border border-[#564a76] rounded-[25px] text-white text-[14px] font-[600]">
                <div className="flex justify-center items-center">
                  <img className="ml-[-18px]" src={PoutingFace}></img>
                  <p className="ml-2">Potential loss:</p>
                </div>
                <div className=" flex justify-center items-center">
                  <div className="">-5 USD</div>
                </div>
              </div> */}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
