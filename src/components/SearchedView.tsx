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

const SearchedView = ({ searchValue }: SearchValue) => {
  const [manhwa, setManhwa] = useState<Manhwa[]>([]);
  const [manhwaId, setManhwaId] = useState<string[]>([]);
  const [manhwaCoverId, setManhwaCoverId] = useState<string[]>([]);

  useEffect(() => {
    if (searchValue) {
      searchManhwa(searchValue)
        .then((response) => {
          console.log("first ", response.data);
          setManhwa(response.data);
          setManhwaId(response.data.map((manga: ManhwaId) => manga.id));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [searchValue]);

  console.log("manhwa ids ", manhwaId); // cover id

  // grab cover id
  useEffect(() => {
    if (manhwaId.length > 0) {
      const mangaIdParam = manhwaId.map((id) => `manga%5B%5D=${id}`).join("&");
      console.log("manga id param ", mangaIdParam);
      const url = `https://api.mangadex.org/cover?limit=10&${mangaIdParam}`;
      axios
        .get(url)
        .then((response) => {
          console.log("cover id response ", response.data);
          console.log(
            "cover id response 2 ",
            response.data.data.map((item: any) => item.attributes.fileName)
          );

          const coverFileName = response.data.data.map(
            (item: any) => item.attributes.fileName
          );
          setManhwaCoverId(coverFileName);
          //   setManhwaCoverId(response.data.attributes?.map((fileName : any) => fileName.fileName));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [manhwaId]);

  console.log("cover id ", manhwaCoverId);
  const RETRIEVE_COVER_URL =
    "https://uploads.mangadex.org/covers/:manga-id/:cover-filename";

  useEffect(() => {});
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 justify-items-center align-items-center">
      {manhwa.map((item : any, index : number) => (
        <Card maxW="xs" key={item.id}>
          <CardBody>
            <img
              src={
                `https://uploads.mangadex.org/covers/${item.id}/${manhwaCoverId[index]}`
              }
              alt=""
            />
            <h2>{item.attributes?.title.en}</h2>
            <h2>{item.id}</h2>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default SearchedView;
