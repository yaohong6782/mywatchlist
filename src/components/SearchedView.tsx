import React, { useEffect } from "react";
import axios from "axios";

type SearchValue = {
  searchValue: string;
};
const SearchedView = ({ searchValue }: SearchValue) => {
  //   console.log(searchValue);

  useEffect(() => {}, []);
  return <div>{searchValue}</div>;
};

export default SearchedView;
