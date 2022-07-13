import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
function App() {
  const [currentId, setCurrentId] = useState(null);
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar currentId={currentId} setCurrentId={setCurrentId} />
        <Routes>
          <Route path="/" element={() => <Redirect to="/posts" />} />
          <Route
            path="/"
            element={<Home currentId={currentId} setCurrentId={setCurrentId} />}
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
