import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Trending from "./Components/Pages/Trending";
import Popular from "./Components/Pages/Popular";
import Movie from "./Components/Pages/Movie";
import Tvshows from "./Components/Pages/Tvshows";
import People from "./Components/Pages/People";
import Moviedetails from "./Components/Moviedetails";
import Peopledetails from "./Components/Peopledetails";
import Tvdetails from "./Components/Tvdetails";
import Trailer from "./Components/Trailer";
import Notfound from "./Components/Notfound";
import About from "./Components/Pages/About";
import Bookmarks from "./Components/Bookmarks";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="w-full min-h-screen bg-[#F1F1F1] flex ">
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/trending" element={<Trending />}></Route>
        <Route path="/popular" element={<Popular />}></Route>
        <Route path="/movies" element={<Movie />}></Route>
        <Route path="/movie/detail/:id" element={<Moviedetails />}>
          <Route path="/movie/detail/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/:tvshows" element={<Tvshows />}></Route>
        <Route path="/tv/detail/:id" element={<Tvdetails />}>
          <Route path="/tv/detail/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/people" element={<People />}></Route>
        <Route path="/people/detail/:id" element={<Peopledetails />}></Route>
        <Route path="/bookmarks" element={<Bookmarks />}></Route>
        <Route path="/about" element={<About />}></Route>

        <Route path="*" element={<Notfound />}></Route>
      </Routes>
    </div>
  );
};

export default App;
