import React, { useState, useReducer } from "react";

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

    default:
        throw new Error();
  }
};

const InputBox = () => {
//   const [inputData, setInputData] = useState<string>();

  const [state, dispatch] = useReducer(reducer, initialState);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'onChange',
      field: event.target.name as keyof InitialState,
      value: event.target.value,
    });
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(state.title);
  };

//   const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputData(e.target.value);
//   };
  return (
    <div className="flex justify-center">
      <form onSubmit={handleFormSubmit}>
        <label className="text-lg font-bold ">Title : </label>
        <input
          className="rounded-lg border-2 border-indigo-500/100 px-2"
          type="text"
          name="title"
          onChange={inputHandler}
        />
      </form>
    </div>
  );
};

export default InputBox;
