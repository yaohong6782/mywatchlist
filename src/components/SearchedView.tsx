import React, { useState, useEffect } from "react";
import axios from "axios";
import { searchManhwa } from "./lib/common";
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
const MANHWA_COVER_URL =
  "https://api.mangadex.org/cover?limit=10&manga={manga_id}";

const SearchedView = ({ searchValue }: SearchValue) => {
  const [manhwa, setManhwa] = useState<Manhwa[]>([]);
  const [manhwaId, setManhwaId] = useState<string[]>([]);

  useEffect(() => {
    if (searchValue) {
      searchManhwa(searchValue)
        .then((response) => {
          console.log(response.data);
          setManhwa(response.data);
          setManhwaId(response.data.map((manga: ManhwaId) => manga.id));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [searchValue]);

  console.log("cover ids ", manhwaId); // cover id

  useEffect(() => {
    if (manhwaId.length > 0) {
      const mangaIdParam = manhwaId.map((id) => `manga%5B%5D=${id}`).join("&");
      console.log('manga id param ', mangaIdParam)
      const url = `https://api.mangadex.org/cover?limit=10&${mangaIdParam}`;
      axios
        .get(url)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [manhwaId]);

  console.log("state ", manhwa); // entire response consisting of manga id

  //   useEffect(() => {
  //     if (manhwaId.length > 0) {
  //       const coverPromises = manhwaId.map((id : any) => {
  //         const url = MANHWA_COVER_URL.replace("{manga_id}", id);
  //         return axios.get(url).then((response) => response.data);
  //       });

  //       Promise.all(coverPromises)
  //         .then((coverResponses) => {
  //           console.log(coverResponses); // An array of cover image data for each manga ID
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     }
  //   }, [manhwaId]);

  return (
    <div className="grid grid-cols-3 gap-3">
      {manhwa.map((item) => (
        <Card maxW="lg" key={item.id}>
          <CardBody>
            <h2>{item.attributes?.title.en}</h2>
            <h2>{item.id}</h2>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default SearchedView;
