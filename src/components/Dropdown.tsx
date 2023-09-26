import React, { useEffect, useState } from "react";

import "./Dropdown.css";
export interface IDropdown {
  id: number;
  name: string;
}
type PropType = {
  data: IDropdown[];
  searchHandler: (data: IDropdown[], searchValue: string) => IDropdown[];
  dropdownSelectionHandler: (data: IDropdown) => void;
};
export default function DropDownTag(props: PropType) {
  const { data, searchHandler, dropdownSelectionHandler } = props;
  const [expanded, setExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchVal = useDebouncedValue(searchValue);

  const dropdownClicked = () => {
    if (searchValue.length > 0) {
      setExpanded(true);
    }
    if (searchValue.length < 0) {
      setExpanded(false);
    }

    setSearchValue("");
    setExpanded(!expanded);
  };

  const dropDownValueSelected = (selectedData: IDropdown) => {
    setExpanded((x) => !x);
    if (searchValue.length > 0) {
      dropdownSelectionHandler?.(selectedData);
    }
    if (listToShow?.length >= 1) {
      dropdownSelectionHandler?.(selectedData);
    }
    // setSearchValue("");
    setSearchValue(selectedData.name);
  };

  const textChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (searchValue.length > 0) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
    //setExpanded(true);
    setSearchValue(e.target.value);
  };

  const listToShow = searchHandler
    ? searchHandler(data, debouncedSearchVal)
    : data;

  console.log("list to show", listToShow);
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchValue.length > 0) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }

    if (searchValue && e.key === "Enter") {
      dropDownValueSelected({
        id: 0,
        name: searchValue,
      });
    }
  };
  return (
    <div className={`select-field-wrap ${expanded && "selected"}`}>
      <div
        onClick={dropdownClicked}
        className={`${"drop-container-custom-tag"} ${
          listToShow?.length > 0 ? "active" : null
        }`}
      >
        <input
          className="inputBorderNone tag-color"
          placeholder="Search"
          type="text"
          onChange={textChangeHandler}
          onKeyUp={handleKeyPress}
          value={searchValue}
        />
      </div>
      {
        <div
          className={`${
            searchValue.length > 0 || listToShow.length > 0
              ? "downListContainer"
              : ""
          } relativeDropDown`}
        >
          {(searchValue.length > 0 || listToShow.length > 0) && (
            <ul className="inner-filedList linear-Ul">
              {listToShow.length == 0 && <ul key={0}>No match Found</ul>}
              {listToShow.map((element, i) => {
                return (
                  <ul
                    key={element?.id || i}
                    onClick={() => dropDownValueSelected(element)}
                  >
                    {element.name}
                  </ul>
                );
              })}
            </ul>
          )}
        </div>
      }
    </div>
  );
}

export function useDebouncedValue<T>(value: T): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerOut = setTimeout(() => {
      setDebouncedValue(value);
    }, 1);
    return () => clearTimeout(timerOut);
  }, [value]);

  return debouncedValue;
}
