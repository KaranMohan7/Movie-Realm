import React from "react";
import image from "../../assets/Pictures/no-image.png";
import { Link } from "react-router-dom";
import { removedataMain } from "../../Store/Reducers/bookmarkSlice";
import { useDispatch } from "react-redux";

const Bookmarkcard = ({ item }) => {
  const dispatch = useDispatch();

  const deleter = () => {
    dispatch(removedataMain(item.id));
  };

  return (
    <>
      <div className="w-64 h-80 bg-white overflow-hidden rounded-md ">
        <Link
          to={`/${
            (item.media_type === "movie" && "movie") ||
            (item.media_type === "tv" && "tv") ||
            "people"
          }/detail/${item.id}`}
        >
          <img
            className="w-full h-64"
            src={`https://image.tmdb.org/t/p/original${
              item.backdrop_path || item.profile_path || image
            }`}
          />

          <p className="p-2 text-xl font-semibold">
            {item.name ||
              item.title ||
              item.original_name ||
              item.original_title}
          </p>
        </Link>
      </div>
      <button
        onClick={deleter}
        className="w-[8rem] p-2 rounded-md text-white bg-black font-semibold mt-3"
      >
        Remove
      </button>
    </>
  );
};

export default Bookmarkcard;
