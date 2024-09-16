import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Notfound from './Notfound'

const Trailer = () => {
  const navigate = useNavigate();
  const {pathname } = useLocation()
  const category = pathname.includes('movie') ? 'movie' : 'tv';
 
 const mainvid = useSelector((state) => state[category].data.videos );

 useEffect(() => {

  document.body.style.overflow = 'hidden';
  window.scrollTo(0, 0);

  return () => {

    document.body.style.overflow = 'auto';
  };
}, []); 
 
  return (
    <div className=" bg-[rgba(0,0,0,0.7)] absolute z-[100] top-0 left-0 w-full h-screen flex items-center justify-center ">
      <Link>
        <i
          onClick={() => navigate(-1)}
          class="ri-close-line text-lg lg:text-3xl text-white top-[1%] absolute"
        ></i>
      </Link>
      { mainvid ? (
        <ReactPlayer
          height={600}
          width={1200}
          controls
          url={`https://www.youtube.com/watch?v=${mainvid.key}`}
        />
      ) : (
        <Notfound />
      )}
    </div>
  );
};

export default Trailer;
