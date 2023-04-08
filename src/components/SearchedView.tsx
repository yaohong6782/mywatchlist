import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Card, CardBody } from "@chakra-ui/card";

type SearchValue = {
  searchValue: string | null;
};

type Manhwa = {
  id: string;
  title: Record<string, string>;
  attributes?: Record<string, any> | undefined;
};

type ManhwaId = {
  id: Record<string, string>;
};

const SearchedView = ({ searchValue }: SearchValue) => {
  const GET_MANHWA_API = `https://api.mangadex.org/manga?limit=10&title=${searchValue}`;
  const GET_COVER_API = `https://api.mangadex.org/cover?limit=10`;
  const RETRIEVE_COVER_URL =
    "https://uploads.mangadex.org/covers/:manga-id/:cover-filename";

  // const coverUrl = `https://uploads.mangadex.org/covers/${manhwa.id}/${manhwa.attributes?.coverArt?.[0]}.256.jpg`;
  const [manhwaList, setManhwaList] = useState<any>([]);
  let manhwaIdListRef = useRef([]);
//   let manhwaIdList = [];

  interface CoverApiResponse {
    data: {
      id: string;
      type: string;
      attributes: {
        fileName: string;
      };
      relationships: {
        type: string;
        id: string;
      }[];
    }[];
  }

  useEffect(() => {
    if (searchValue) {
      axios
        .get(GET_MANHWA_API)
        .then((res) => {
          console.log(res.data.data);
          setManhwaList(res.data.data);
          manhwaIdListRef.current = res.data.data.map(
            (mangaId: any) => mangaId.id
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [GET_MANHWA_API, searchValue]);


  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 justify-items-center align-items-center">
      {manhwaList.map((manhwa: any, idx: number) => {
        return (
          <div key={idx}>
            <p>{manhwa.attributes.title.en}</p>
            <p>{manhwa.attributes.coverArt}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SearchedView;
