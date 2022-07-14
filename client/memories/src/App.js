import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/postdetails/PostDetails";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./slice/fetchSlice";

// ===========================================================
function App() {
  const [currentId, setCurrentId] = useState(null);

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar currentId={currentId} setCurrentId={setCurrentId} />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route
            path="/posts"
            element={<Home currentId={currentId} setCurrentId={setCurrentId} />}
          />
          <Route
            path="/posts/search"
            element={<Home currentId={currentId} setCurrentId={setCurrentId} />}
          />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
