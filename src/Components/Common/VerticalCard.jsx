import React from "react";
import image from "../../assets/Pictures/no-image.png";
import { Link } from "react-router-dom";
import { adddataMain, removedataMain, toggle } from "../../Store/Reducers/bookmarkSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const VerticalCard = ({ item,movie,tv }) => {
  const dispatch = useDispatch();
  const { bookmarkedMovies} = useSelector((state) => state.bookmark);

  const handleBookmarkToggle = () => {
    dispatch(toggle(item.id));

    if (!bookmarkedMovies[item.id]) {
      toast.success("Bookmarked Successfully");
      dispatch(adddataMain(item));
    }else{
      dispatch(removedataMain(item.id))
    }
  };

  const isBookmarked = bookmarkedMovies[item.id];

  return (
    <div className="flex justify-center flex-col p-3 py-5 overflow-hidden ">
      
      <Link
        to={`/${
           item.media_type && item.media_type || movie && movie || tv && tv || 'people'
        }/detail/${item.id}`}
      >
        <img
          className="w-80 h-80  lg:w-[20rem] lg:h-[24rem] xl:w-[20rem] xl:h-[24rem] rounded-lg object-cover "
          src={`https://image.tmdb.org/t/p/original${
            item.backdrop_path || item.profile_path || image
          }`}
        />
      </Link>
      <div className="flex items-center justify-between">
        <p className="font-semibold text-lg mt-1">
          {(
            item.name ||
            item.title ||
            item.original_name ||
            item.original_title
          ).slice(0, 34)}
        </p>
        {!isBookmarked ? (
          <i
            onClick={ handleBookmarkToggle }
            className="ri-bookmark-line text-xl"
          ></i>
        ) : (
          <i
          onClick={() => {
            handleBookmarkToggle();
            toast.success("Bookmark Removed");
          }}
            className="ri-bookmark-fill text-xl"
          ></i>
        )}
      </div>
    </div>
  );
};

export default VerticalCard;
