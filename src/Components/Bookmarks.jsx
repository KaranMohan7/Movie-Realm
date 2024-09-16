import React from "react";
import { useNavigate } from "react-router-dom";
import Bookmarkcard from "./Common/Bookmarkcard";
import { useSelector } from "react-redux";

const Bookmarks = () => {
  const navigate = useNavigate();
  const { dataMain } = useSelector((state) => state.bookmark);

  return (
    <div className="w-full min-h-screen">
      <div className="flex items-center gap-6 md:gap-8 lg:gap-10 xl:gap-10 py-5 px-[10%] ">
        <i
          onClick={() => navigate(-1)}
          class="ri-arrow-left-line text-lg lg:text-xl"
        ></i>
      </div>
      <h1 className="text-4xl font-semibold px-28">BOOKMARK SECTION</h1>
      <div className="flex flex-col gap-10 px-28 py-4">
        {dataMain.length > 0 ? (
          dataMain.map((item, index) => (
            <div key={index}>
              <Bookmarkcard item={item} />
            </div>
          ))
        ) : (
          <h1 className="text-zinc-400 text-center text-xl mt-20">
            No Bookmarks Yet
          </h1>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
