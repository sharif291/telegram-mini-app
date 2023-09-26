import React, { useState } from "react";
import DropDownTag, { IDropdown } from "./Dropdown";
import { useAppDispatch } from "../redux/hooks";
import { setDirection, setPair } from "../redux/slices/dataSlice";

function DirectionSelection() {
  const dispatch = useAppDispatch();
  const [dropDownData, setDropDownData] = useState<IDropdown[]>([
    { id: 1, name: "UP" },
    { id: 2, name: "DOWN" },
  ]);
  const searchHandler = (data: IDropdown[], searchValue: string) => {
    const filterList = data?.filter((l) =>
      l.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
    return filterList;
  };
  const dropdownSelectionHandler = (data: IDropdown) => {
    let selectedData = dropDownData.find((x) => x.id == data.id);

    dispatch(setDirection(selectedData?.name));
  };
  return (
    <div className=" p-2">
      <h3 className="text-left">Select The DirectionSelection You want to trade</h3>
      <DropDownTag
        data={dropDownData}
        searchHandler={searchHandler}
        dropdownSelectionHandler={dropdownSelectionHandler}
      />
    </div>
  );
}

export default DirectionSelection;
