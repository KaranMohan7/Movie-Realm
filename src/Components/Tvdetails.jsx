import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailApitv } from "../Store/Actions/TvActions";
import { removedatatv } from "../Store/Reducers/tvSlice";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import Card from "./Common/Card";

const Tvdetails = () => {
  const { data } = useSelector((state) => state.tv);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(detailApitv(id));

    return () => {
      dispatch(removedatatv());
    };
  }, [id]);

  return data ? (
    <div
      className=" relative w-full min-h-screen "
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${data.details.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex items-center px-12 gap-7 text-xl h-14 text-white">
        <i
          onClick={() => navigate(-1)}
          class="ri-arrow-left-line text-lg lg:text-xl "
        ></i>
        <a target="__blank" href={data.details.homepage}>
          <i class="ri-link"></i>
        </a>
        <a
          target="__blank"
          href={`https://www.wikidata.org/wiki/${data.external.wikidata_id}`}
        >
          <i class="ri-earth-fill"></i>
        </a>
        <a
          target="__blank"
          href={`https://www.imdb.com/title/${data.external.imdb_id}`}
        >
          <p className="font-semibold">imdb</p>
        </a>
      </div>

      <div className="flex flex-col md:flex-row lg:flex-row ml-10 md:ml-14 lg:ml-20 mt-9 rounded-md overflow-hidden ">
        <img
          className=" w-80 h-96 object-cover ml-4 md:ml-0 lg:ml-0  "
          src={`https://image.tmdb.org/t/p/original${
            data.details.poster_path || data.details.backdrop_path
          }`}
        ></img>
        <div className=" p-4 md:p-7 lg:p-11">
          <h1 className="font-semibold text-[1.7rem] md:text-4xl lg:text-6xl w-full  text-white capitalize">
            {data.details.name ||
              data.details.title ||
              data.details.original_name ||
              data.details.original_title}
          </h1>
          <p className="text-xs lg:text-sm text-white flex  items-center gap-2 mt-2 min-w-fit">
            <i className="ri-calendar-line"></i>
            {data.details.first_air_date
              ? data.details.first_air_date
              : "not found"}
            <i className="ri-movie-2-fill"></i>
            {data.details.status}
            <span className="font-medium pl-3 text-zinc-200 hidden lg:block min-w-fit">
              {data.details.genres.map((item) => item.name).join(",")}
            </span>
          </p>
          <h1 className="text-xl text-red-100 italic font-semibold">
            {data.details.tagline}
          </h1>
          <p className="font-light md:font-normal lg:font-normal xl:font-medium text-sm  text-white w-full py-2 ">
            {data.details.overview}
          </p>
          <div className="flex flex-col mb-4">
            <p className="text-white font-semibold text-xl">Translated in </p>
            <p className="text-red-50  text-sm ">
              {data.translation.join(", ")}{" "}
            </p>
          </div>
          <Link
            to={`${pathname}/trailer`}
            className=" p-2 px-4 rounded-md bg-blue-600 text-white font-semibold "
          >
            <i class="ri-play-fill text-lg"></i>Watch Trailer
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-center space-y-4  px-10 md:px-18 lg:px-20 md:py-7 lg:py-7 ">
        <div className="flex items-center gap-2 md:gap-4 lg:gap-5   ">
          <h1 className="text-white font-semibold text-sm lg:text-lg xl:text-lg">
            Available on Platforms
          </h1>
          {data.watchprovider && data.watchprovider.flatrate ? (
            data.watchprovider.flatrate.map((item, index) => (
              <img
                className="w-9 rounded-md"
                key={index}
                src={`https://image.tmdb.org/t/p/original${item.logo_path}`}
              />
            ))
          ) : (
            <h1 className="text-red-100">"Not Found"</h1>
          )}
        </div>
      </div>

      <h1 className="text-2xl text-white font-semibold p-5">Seasons</h1>
      <div className="flex items-center overflow-auto px-3 gap-5 ">
        {data.details.seasons &&
          data.details.seasons.map((item, index) => (
            <div className=" h-[28.5rem]" key={index}>
              <div className="w-60 h-96 bg-white rounded-md ">
                <img
                  className="rounded-md w-96 h-96 object-cover"
                  src={
                    item.poster_path &&
                    `https://image.tmdb.org/t/p/original${item.poster_path}`
                  }
                />
                <h1 className="text-lg text-center text-white font-semibold ">
                  {item.name ||
                    item.title ||
                    item.original_name ||
                    item.original_title}
                </h1>
              </div>
            </div>
          ))}
      </div>
      <h1 className="text-2xl text-white font-semibold p-5">
        Recommendations & Similarities
      </h1>
      <div className="flex items-center overflow-auto px-3   gap-8">
        {data.recommendations && data.recommendations.length > 0 ? (
          data.recommendations.map((item, index) => (
            <Link
              to={`/${item.media_type}/detail/${item.id}`}
              key={index}
              className="w-full h-56"
            >
              <Card item={item} />
            </Link>
          ))
        ) : data.similar && data.similar.length > 0 ? (
          data.similar.map((item, index) => (
            <Link
              to={`/${item.media_type}/detail/${item.id}`}
              key={index}
              className="w-full h-56"
            >
              <Card item={item} />
            </Link>
          ))
        ) : (
          <p className="text-xl w-full font-semibold text-center py-4 text-white">
            Not Found !
          </p>
        )}
      </div>
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default Tvdetails;
