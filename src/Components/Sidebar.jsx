import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const data = [
    { icon: <i className="ri-fire-fill"></i>, text: "trending" },
    { icon: <i className="ri-bard-fill"></i>, text: "popular" },
    { icon: <i className="ri-movie-2-fill"></i>, text: "movies" },
    { icon: <i className="ri-tv-fill"></i>, text: "tvshows" },
    { icon: <i className="ri-team-fill"></i>, text: "people" },
  ];

  return (
    <>
      <div className="w-[15%] md:w-[30%] lg:w-[20%] h-full border-r-[2px] border-zinc-400">
        <div className="flex items-center gap-2 p-2 py-4 md:p-5 lg:p-7">
          <i className="ri-film-fill text-xl md:text-xl lg:text-2xl xl:text-3xl "></i>
          <p className="hidden md:block text-xs font-semibold md:text-xl lg:text-2xl ">
            Movie Realm
          </p>
        </div>
        <h1 className="hidden md:block p-2 px-3 md:px-5 lg:px-7 text-sm md:text-xl lg:text-xl font-semibold">
          New Feeds
        </h1>
        <div className="py-2">
          {data.map((item, index) => (
            <Link
            to={`/${item.text}`}
              className="flex mb-7 lg:mb-5 ml-3 md:ml-10 lg:ml-10 items-center gap-3 text-xs lg:text-lg duration-150 hover:bg-black hover:text-white p-1 lg:p-[10px] rounded-xl"
              key={index}
            >
              <p className="text-xl">{item.icon}</p>
              <p className="hidden md:block capitalize ">{item.text}</p>
            </Link>
          ))}
        </div>
        <hr className="rounded-full" />

        <div className="mt-10 md:mt-4 lg:mt-4 xl:mt-5" >
          <h1 className="hidden md:block p-2 px-3 md:px-5 lg:px-7 text-xs md:text-xl lg:text-xl font-semibold">
            Website Information
          </h1>
          <Link to={'/about'} className="flex mb-7 lg:mb-5 ml-3 md:ml-10 lg:ml-10 items-center gap-3 text-xs lg:text-lg hover:bg-black hover:text-white p-1 lg:p-[10px] rounded-xl">
            <i className="ri-information-fill text-xl"></i>
            <p className="hidden md:block">About</p>
          </Link>
          <a target="__blank" href="https://www.linkedin.com/in/karan-mohan-talwar-aaa731295/" className="flex mb-7 lg:mb-5 ml-3 md:ml-10 lg:ml-10 items-center gap-3 text-xs lg:text-lg hover:bg-black hover:text-white p-1 lg:p-[10px] rounded-xl">
            <i className="ri-phone-fill text-xl"></i>
            <p className="hidden md:block">Contact Us</p>
          </a>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
