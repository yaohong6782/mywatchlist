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
  const RETRIEVE_COVER_URL =
    "https://uploads.mangadex.org/covers/:manga-id/:cover-filename";

  // const coverUrl = `https://uploads.mangadex.org/covers/${manhwa.id}/${manhwa.attributes?.coverArt?.[0]}.256.jpg`;
  const [manhwaList, setManhwaList] = useState<any>([]);
  const [manhwaArticles, setManhwaArticles] = useState<any>({});
  const [manhwaCardsList, setManhwaCardsList] = useState<any>([]);
  let manhwaIdListRef = useRef([]);
  let manhwaIdList = [];

  useEffect(() => {
    if (searchValue) {
      axios
        .get(GET_MANHWA_API)
        .then((res) => {
          //   console.log(res.data.data);
          //   console.log(res.data.data[0].relationships);
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

  // grabbed list of cover ids
  const manhwaCoverArtIds = manhwaList.map((manhwa: any) => {
    const coverArtRelationship = manhwa.relationships.find(
      (relationship: any) => relationship.type === "cover_art"
    );
    return coverArtRelationship.id;
  });

  console.log("cover ids ", manhwaCoverArtIds);
  const idsUrl = manhwaCoverArtIds.join("&ids%5B%5D=");
  const coverApiUrl = `https://api.mangadex.org/cover?ids%5B%5D=${idsUrl}`;
  console.log("cover api url ", coverApiUrl);

  // grabbing file name
  useEffect(() => {
    if (manhwaCoverArtIds.length > 0) {
      axios
        .get(coverApiUrl)
        .then((res) => {
          console.log("package ", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 justify-items-center align-items-center">
      {manhwaList.map((manhwa: any, idx: number) => {
        return (
          <div key={idx}>
            <p>{manhwa.attributes.title.en}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SearchedView;
