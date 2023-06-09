import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Card, CardBody } from "@chakra-ui/card";
import { Button, Image, Heading } from "@chakra-ui/react";

type SearchValue = {
  searchValue: string | null;
};

type Manhwa = {
  id: string;
  title: Record<string, string>;
  attributes?: Record<string, any> | undefined;
};

const SearchedView = ({ searchValue }: SearchValue) => {
  //   const REFERNCE_EXPANSION_API = `https://api.mangadex.org/manga/${mangaId}?includes[]=cover_art`
  const baseUrl = "https://api.mangadex.org";
  const GET_MANHWA_API = `${baseUrl}/manga`;
  const [mangaData, setMangaData] = useState<any>();
  const [mangaCardData, setMangaCardData] = useState<any>([]);

  useEffect(() => {
    if (searchValue) {
      axios
        .get(GET_MANHWA_API, {
          params: {
            limit: 10,
            title: searchValue,
            includes: ["cover_art"],
          },
        })
        .then((res) => {
          //   console.log(res.data);
          setMangaData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchValue, GET_MANHWA_API]);
  //   console.log("manga data ", mangaData);
  useEffect(() => {
    if (searchValue == null) {
      setMangaData(null);
    }
  }, [searchValue]);

  let mangaID = mangaData?.map((item: any) => {
    return item.id;
  });

//   console.log(mangaData);
  return (
    <>
      {mangaData?.map((item: any, idx: number) => {
        const coverArtRelationship = item.relationships.find(
          (rel: any) => rel.type === "cover_art"
        );
        const mangaId = item.id;
        // const coverArtId = coverArtRelationship?.id || "";
        const coverArtFileName = coverArtRelationship?.attributes.fileName;
        return (
          <div key={idx}>
            <div>
              <Heading as="h4" size="md">{item.attributes?.title.en}</Heading>
              <Image
                src={`https://uploads.mangadex.org/covers/${mangaId}/${coverArtFileName}.256.jpg`}
                className="flex justify-items-center items-center"
              />
            </div>
            {/* <p>{item.attributes.description.en}</p> */}
          </div>
        );
      })}
    </>
  );
};

export default SearchedView;
