import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import "./App.css";
import InputBox from "./components/InputBox";
import ViewingTab from "./components/ViewingTab";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <h1 className="text-3xl font-bold underline">yao hong </h1>
        <br />
        <InputBox />
        <br/>
      </div>
    </ChakraProvider>
  );
}

export default App;
