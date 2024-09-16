import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Dropdown from "../Common/Dropdown";
import { useNavigate } from "react-router-dom";
import FetchData from "../../Utils/FetchData";
import VerticalCard from "../Common/VerticalCard";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../Loading";

const Trending = () => {
  const [category, setcategory] = useState("all");
  const [trending, settrending] = useState([]);
  const [duration, setduration] = useState("day");
  const [hasmore, sethasmore] = useState(true);
  const [page, setpage] = useState(1);

  const searcherCard = async () => {
    const data = await FetchData(
      `https://api.themoviedb.org/3/trending/${category}/${duration}?page=${page}`
    );
    if (data.results.length > 0) {
      settrending((prev) => [...prev, ...data.results]);
      setpage(page + 1);
    } else {
      sethasmore(false);
    }
  };

  useEffect(() => {
    if (trending.length === 0) {
      searcherCard();
    } else {
      setpage(1);
      settrending([]);
      searcherCard();
    }
  }, [category, duration]);

  const navigate = useNavigate();
  return trending.length > 0 ? (
    <div className="w-full">
      <div className=" flex items-center justify-between  px-4  md:px-18 lg:px-24 xl:px-28">
        <div className=" flex justify-center items-center gap-3">
          <i
            onClick={() => navigate(-1)}
            class="ri-arrow-left-line text-lg lg:text-xl"
          ></i>
          <p className="text-lg lg:text-2xl xl:text-xl font-semibold">
            Trending - <span className="text-xs lg:text-sm">({category})</span>
          </p>
        </div>
        <div className="">
          <Navbar />
        </div>
      </div>

      <div className=" flex justify-center items-center gap-5 mt-7">
        <Dropdown
          title={"Category"}
          options={["movie", "tv", "all"]}
          func={setcategory}
        />
        <Dropdown
          title={"Duration"}
          options={["week", "day"]}
          func={setduration}
        />
      </div>
      <InfiniteScroll
        dataLength={trending.length}
        loader={<Loading/>}
        next={searcherCard}
        hasMore={hasmore}
      >
        <div className="flex flex-wrap justify-evenly items-center ">
          {trending.map((item, index) => (
            <div key={index}>
              <VerticalCard item={item} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
