import React, { useState, useEffect } from "react";
import axios from "axios";
import { searchManhwa } from "./lib/common";

type SearchValue = {
  searchValue: string | null;
};

type Manhwa = {
  id: string;
  title: Record<string, string>;
  attributes?: Record<string, any> | undefined;
};

const SearchedView = ({ searchValue }: SearchValue) => {
  const [manhwa, setManhwa] = useState<Manhwa[]>([]);

  useEffect(() => {
    if (searchValue) {
      searchManhwa(searchValue)
        .then((response) => {
          console.log(response.data);
          setManhwa(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [searchValue]);

  return (
    <div>
      {manhwa.map((item) => (
        <div key={item.id}>
          <h2>{item.attributes?.title?.en}</h2>
        </div>
      ))}
    </div>
  );
};

export default SearchedView;
