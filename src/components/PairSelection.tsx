import React, { useState } from "react";
import DropDownTag, { IDropdown } from "./Dropdown";
import { useAppDispatch } from "../redux/hooks";
import { setPair } from "../redux/slices/dataSlice";

function PairSelection() {
  const dispatch = useAppDispatch();
  const [dropDownData, setDropDownData] = useState<IDropdown[]>([
    { id: 1, name: "XAU/USD" },
    { id: 2, name: "GBP/USD" },
    { id: 3, name: "EUR/USD" }
  ]);
  const searchHandler = (data: IDropdown[], searchValue: string) => {
    const filterList = data?.filter((l) =>
      l.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
    return filterList;
  };
  const dropdownSelectionHandler = (data: IDropdown) => {
    let selectedData = dropDownData.find((x) => x.id == data.id);

    dispatch(setPair(selectedData));
  };
  return (
    <div className=" p-2">
      <h3 className="text-left">Select The Pair You want to trade</h3>
      <DropDownTag
        data={dropDownData}
        searchHandler={searchHandler}
        dropdownSelectionHandler={dropdownSelectionHandler}
      />
    </div>
  );
}

export default PairSelection;
