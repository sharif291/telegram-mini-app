import { useState } from "react";
export default function SearchableDropdown({
  allItem,
  isLoading,
  propsToSet
}: {
  allItem: { title: string; value: any }[];
  isLoading: boolean;
  propsToSet: any;
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchHandler = (
    data: { title: string; value: string }[],
    searchValue: string
  ) => {
    console.log("searchValue", typeof searchValue);
    const filterList = data?.filter((l) => {
      if (typeof searchValue == typeof 1) {
        return l.title.toLocaleLowerCase().includes(searchValue);
      }
      return l.title
        .toLocaleLowerCase()
        .includes(searchValue.toLocaleLowerCase());
    });
    return filterList;
  };
  let listToShow = searchHandler ? searchHandler(allItem, query) : allItem;
  console.log(listToShow);

  return (
    <div className="w-full search-container max-w-2xl">
      <form role="search" action="/search" className="search relative">
        <div className="relative z-10">
          <input
            type="text"
            className="w-[250px] h-[30px] rounded-[18px] relative z-10  pl-2 focus:border-none"
            placeholder="Search"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            onChange={(e) => {
              propsToSet(null);
              setQuery(e.target.value);
            }}
            value={query}
          ></input>
        </div>
        <SearchResultList
          isLoading={isLoading}
          open={isOpen}
          setIsOpen={setIsOpen}
          data={listToShow}
          setQuery={setQuery}
          propsToSet={propsToSet}
        />
      </form>
    </div>
  );
}

const LoadingSkeleton = () => (
  <div role="status" className="max-w-md animate-pulse p-4">
    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[600] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
    <span className="sr-only">Loading...</span>
  </div>
);

function SearchResultList({
  isLoading,
  open,
  data,
  setQuery,
  propsToSet,

  setIsOpen,
}: {
  isLoading: boolean;
  open: boolean;
  data: {
    title: string;
    value: any;
  }[];
  setQuery: Function;
  propsToSet: any;
  setIsOpen: any;
}) {
  return (
    <>
      {open && (
        <div className="flex items-center justify-center min-h-[54px] search__content relative w-full overflow-hidden mt-[10px] z-[999]">
          <div className="w-full">
            {isLoading && <LoadingSkeleton />}
            {!isLoading && (
              <ul>
                {data.map((x, key) => (
                  <li
                    onClick={() => {
                      propsToSet(x.value);
                      setQuery(x.value);
                      setIsOpen(false);
                    }}
                    key={key}
                    className=" odd:text-[#9691AC] odd:bg-[#9691AC33] even:bg-[#FEFD38] even:text-[#1C062E] text-[16px] font-[600]"
                  >
                    {x.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}
