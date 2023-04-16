import React, { useState, useReducer } from "react";
import SearchedView from "./SearchedView";
import ViewingTab from "./ViewingTab";
import { Button } from "@chakra-ui/react";

type InitialState = {
  title: string;
};

type ActionState = {
  type: string;
  field?: keyof InitialState;
  value?: string;
};

const initialState: InitialState = {
  title: "",
};

const reducer = (state: InitialState, action: ActionState) => {
  switch (action.type) {
    case "onChange":
      return { ...state, [action.field!]: action.value! };

    case "clearInput":
      return initialState;

    default:
      throw new Error();
  }
};

const InputBox = () => {
  const [searching, setSearching] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "onChange",
      field: event.target.name as keyof InitialState,
      value: event.target.value,
    });
  };

  const clearInput = (event: any) => {
    dispatch({
      type: "clearInput",
    });
    setSearchResult(null);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearching(true);
    setSearchResult(state.title);
    console.log(state.title);
  };

  return (
    <>
      <div className="flex justify-center">
        <form onSubmit={handleFormSubmit}>
          <label className="text-lg font-bold ">Manga : </label>
          <input
            className="rounded-lg border-2 border-indigo-500/100 px-2"
            type="text"
            name="title"
            value={state.title}
            onChange={inputHandler}
          />
          <Button type="button" className="px-3" onClick={clearInput}>
            Clear
          </Button>
        </form>
      </div>
      <br />
      {searching && <SearchedView searchValue={searchResult} />}
      <br />
      {/* <ViewingTab /> */}
    </>
  );
};

export default InputBox;
