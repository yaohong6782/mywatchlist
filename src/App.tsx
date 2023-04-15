import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import "./App.css";
import InputBox from "./components/InputBox";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import ViewingTab from "./components/ViewingTab";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <NavBar />
        <h1 className="text-3xl font-bold underline">yao hong </h1>
        <Routes>
          <Route path="/search" element={<InputBox />} />
          <Route path="/collections" element={<ViewingTab />} />
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App;
