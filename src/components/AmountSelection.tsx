import { useState } from "react";
import DropDownTag, { IDropdown } from "./Dropdown";
import { useAppDispatch } from "../redux/hooks";
import { setAmount } from "../redux/slices/dataSlice";

function AmountSelection() {
  const dispatch = useAppDispatch();
  const [dropDownData] = useState<IDropdown[]>([
    { id: 1, name: "5USD" },
    { id: 2, name: "10USD" },
    { id: 3, name: "15USD" },
  ]);
  const searchHandler = (data: IDropdown[], searchValue: string) => {
    const filterList = data?.filter((l) =>
      l.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
    return filterList;
  };
  const dropdownSelectionHandler = (data: IDropdown) => {
    let selectedData = dropDownData.find((x) => x.id == data.id);

    dispatch(setAmount(selectedData?.name));
  };
  return (
    <div className="p-2">
      <h3 className="text-left">Select The Amount want to trade</h3>
      <DropDownTag
        data={dropDownData}
        searchHandler={searchHandler}
        dropdownSelectionHandler={dropdownSelectionHandler}
      />
    </div>
  );
}

export default AmountSelection;
