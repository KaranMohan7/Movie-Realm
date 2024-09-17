import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import FetchData from "../Utils/FetchData";
import image from ".././assets/Pictures/no-image.png";
import Loading from "./Loading";

const Navbar = () => {
  const [input, setinput] = useState("");
  const [queryshow, setqueryshow] = useState([]);

  useEffect(() => {
    const searcher = async () => {
      const data = await FetchData(
        `https://api.themoviedb.org/3/search/multi?query=${input}`
      );
      setqueryshow(data.results);
    };

    searcher();
  }, [input]);

  return (
    <div className="w-full h-16 relative flex justify-center items-center  ">
      <div className="flex items-center justify-center gap-3 py-4 relative ">
        <Link  to={"/bookmarks"}>
          {" "}
          <i className="ri-bookmark-line text-xl"></i>
        </Link>
        <i className="ri-search-line text-xl"></i>

        <input
          onChange={(e) => setinput(e.target.value)}
          value={input}
          className="w-[40vw] text-base p-2 rounded-md bg-transparent border border-zinc-500  outline-none  text-black  "
          type="text"
          placeholder="Search anything"
        />
        {input.length > 0 && (
          <i onClick={() => setinput("")} className="ri-close-line text-xl"></i>
        )}
      </div>
      <div className=" w-[40vw] absolute max-h-[50vh] top-[100%] overflow-auto backdrop-blur-md ml-7">
        {queryshow ? (
          queryshow.map((item, index) => (
            <Link
              to={`/${item.media_type}/detail/${item.id}`}
              key={index}
              className="font-medium flex items-center justify-start gap-3 p-3 border-b-[1px] border-zinc-300"
            >
              <img
                className=" w-9 h-8 md:w-16 md:h-14  lg:w-16 lg:h-14 rounded-md object-cover"
                src={
                  item.backdrop_path
                    ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
                    : image
                }
                alt=""
              />
              <p
                onClick={() =>
                  setinput(
                    item.name ||
                      item.title ||
                      item.original_name ||
                      item.original_title
                  )
                }
                className=" text-white  text-xs md:text-lg lg:text-lg"
              >
                {item.name ||
                  item.title ||
                  item.original_name ||
                  item.original_title}
              </p>
            </Link>
          ))
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Navbar;
