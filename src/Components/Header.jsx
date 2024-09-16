import React from "react";
import image from ".././assets/Pictures/no-image.png";
import { Link, useLocation } from "react-router-dom";

const Header = ({ data }) => {

  const {pathname} = useLocation();
  return (
    <>
    <div
      className="w-full min-h-[45vh] lg:min-h-[48vh] flex flex-col justify-end p-3 md:p-7 lg:p-7 "
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${
          data.backdrop_path || image
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <h1 className="font-semibold text-xl md:text-4xl lg:text-6xl w-full lg:w-[70%] text-white overflow-hidden text-ellipsis">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>
      <p className="font-light md:font-normal lg:font-normal xl:font-normal text-xs lg:text-sm text-white w-full lg:w-[70%] overflow-hidden text-ellipsis">
        {data.overview.slice(0, 115)}
        <Link  to={`/${data.media_type}/detail/${data.id}`} className="text-blue-600 font-semibold">...more</Link>
      </p>
      <p className="text-xs lg:text-sm text-white flex items-center gap-2 mt-2">
        <i className="ri-calendar-line"></i>
        {data.release_date ? data.release_date : "not found"}
        <i className="ri-movie-2-fill"></i>
        {data.media_type}
      </p>
      <Link to={`/${data.media_type}/detail/${data.id}/trailer`} className="text-white bg-blue-500 font-semibold rounded-md w-[120px] lg:w-32 p-1 mt-3 text-center">
        Watch Trailer
      </Link>
    </div>
    </>
  );
};

export default Header;
