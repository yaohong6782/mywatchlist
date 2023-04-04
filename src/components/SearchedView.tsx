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
  const [manhwaRelationship, setManhwaRelationship] = useState<
    { mangaId: string; fileName: string }[]
  >([]);

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

    // console.log("manhwa ids ", manhwaId); // cover id

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
    if (manhwaId.length > 0) {
      const mangaIdParam = manhwaId.map((id) => `manga%5B%5D=${id}`).join("&");
      const url = `https://api.mangadex.org/cover?limit=5&${mangaIdParam}`;
      axios
        .get(url)
        .then((response: { data: CoverApiResponse }) => {
          console.log("second ", response.data);
          const mangaIdsRelation = response.data.data.map((cover: any) => {
            const mangaRelationship = cover.relationships.find(
              (relationship: any) => relationship.type === "manga"
            );
            return {
              mangaId: mangaRelationship.id,
              fileName: cover.attributes.fileName,
            };
          });
          setManhwaRelationship(mangaIdsRelation);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [manhwaId]);

  console.log("rs ", manhwaRelationship);

  const RETRIEVE_COVER_URL =
    "https://uploads.mangadex.org/covers/:manga-id/:cover-filename";

  useEffect(() => {});
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 justify-items-center align-items-center">
      {/* {manhwa.map((item: any, index: number) => (
        <Card maxW="xs" key={item.id}>
          <CardBody>
            {manhwaRelationship[index] && (
              <img
                src={`https://uploads.mangadex.org/covers/${manhwaRelationship[index].mangaId}/${manhwaRelationship[index].fileName}`}
                alt=""
              />
            )}
            <h2>{item.attributes?.title.en}</h2>
            <h2>{item.id}</h2>
          </CardBody>
        </Card>
      ))} */}
      {manhwa.map((item: any, index: number) => {
        const cover = manhwaRelationship.find(
          (c: any) => c.mangaId === item.id
        );

        return (
          <Card maxW="xs" key={item.id}>
            <CardBody>
              {cover && (
                <img
                  src={`https://uploads.mangadex.org/covers/${cover.mangaId}/${cover.fileName}`}
                  alt=""
                />
              )}
              <h2>{item.attributes?.title.en}</h2>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};

export default SearchedView;
