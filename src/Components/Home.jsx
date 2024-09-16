import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import FetchData from "../Utils/FetchData";
import Header from "./Header";
import { Link } from "react-router-dom";
import Dropdown from "./Common/Dropdown";
import Card from "./Common/Card";
import Loading from './Loading'

const Home = () => {
  const [wallpaper, setwallpaper] = useState(null);
  const [carddetails, setcarddetails] = useState([]);
  const [category, setcategory] = useState("all");

  useEffect(() => {
    const searcher = async () => {
      const data = await FetchData(
        `https://api.themoviedb.org/3/trending/all/day`
      );
      let datamain =
        data.results[Math.floor(Math.random() * data.results.length)];
        
      setwallpaper(datamain);
    };

    searcher();
  }, []);

  useEffect(() => {
    const searcherCard = async () => {
      const data = await FetchData(
        `https://api.themoviedb.org/3/trending/${category}/day`
      );
      setcarddetails(data.results);
    };

    searcherCard();
  }, [category]);

  return wallpaper && carddetails ? (
    <>
      <Sidebar />
      <div className="w-[85%] md:w-[76%] lg:w-[80%] h-full ">
        <Navbar />
        <Header data={wallpaper} />
        <div className="flex items-center justify-between  p-3 md:p-3 lg:p-2  ">
          <h1 className="text-[18px]  lg:text-[26px] font-bold ">Trending</h1>
          <Dropdown
          func={setcategory}
          title={"Filter"}
            options={["tv", "movie", "all"]}
          />
        </div>

        <div className="flex w-full h-
         items-center overflow-auto px-3  gap-8  ">
          {carddetails.map((item, index) => (
            <Link to={`/${item.media_type}/detail/${item.id}`} key={index}>
              <Card item={item} />
            </Link>
          ))}
        </div>
      </div>
    </>
  ) : <Loading/>
};

export default Home;
