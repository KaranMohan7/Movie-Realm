import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removepeople } from "../Store/Reducers/peopleSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { detailApipeople } from "../Store/Actions/peopleActions";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import Card from "./Common/Card";
import Dropdown from "./Common/Dropdown";

const Peopledetails = () => {
  const { data } = useSelector((state) => state.people);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setcategory] = useState("movie");
  
  useEffect(() => {
    dispatch(detailApipeople(id));
    return () => {
      dispatch(removepeople());
    };
  }, [id]);

  return data ? (
    <>
      <div className="w-full min-h-screen ">
        <div className="flex items-center gap-6 md:gap-8 lg:gap-10 xl:gap-10 py-5 px-[10%] ">
          <i
            onClick={() => navigate(-1)}
            class="ri-arrow-left-line text-lg lg:text-xl"
          ></i>
          <a
            target="__blank"
            href={`https://www.wikidata.org/wiki/${data.external.wikidata_id}`}
          >
            <i class="ri-earth-fill text-xl"></i>
          </a>
          <a
            target="__blank"
            href={`https://www.facebook.com/${data.external.facebook_id}`}
          >
            <i class="ri-facebook-fill text-xl"></i>
          </a>
          <a
            target="__blank"
            href={`https://www.instagram.com/${data.external.instagram_id}`}
          >
            <i class="ri-instagram-fill text-xl"></i>
          </a>
          <a
            target="__blank"
            href={`https://www.twitter.com/${data.external.twitter_id}`}
          >
            <i class="ri-twitter-x-fill text-xl"></i>
          </a>
        </div>

        <div className=" flex flex-col md:flex-row lg:flex-row  ml-8 md:ml-12 lg:ml-16 mt-7 rounded-md overflow-hidden  ">
          <img
            className=" w-72 h-72 object-cover ml-5 md:ml-1 lg:ml-0 xl:ml-0 "
            src={`https://image.tmdb.org/t/p/original${data.details.profile_path}`}
          ></img>
          <div className=" w-full lg:w-[80%] xl:w-[80%] mt-5 md:mt-0 lg:mt-0 xl:mt-0 ml-2 md:ml-10 lg:ml-10 xl:ml-10 relative  ">
            <h1 className="font-semibold text-[2rem] md:text-4xl lg:text-6xl w-full capitalize">
              {data.details.name || data.details.original_name}
            </h1>
            <h1 className="font-semibold text-xl w-full capitalize px-5 py-4">
              Biography
            </h1>
            <div className="px-5 py-2 ">
              <p className="text-sm">
                {data.details.biography}
                <Link
                  className="font-bold text-blue-600"
                  to={`https://www.wikidata.org/wiki/${data.external.wikidata_id}`}
                >
                  {" "}
                  more...
                </Link>
              </p>
            </div>
            <h1 className="font-semibold text-lg capitalize px-5 py-3">
              Known For
            </h1>
            <div
              className="flex w-full 
         items-center overflow-auto px-3  gap-8"
            >
              {data.credits.cast.map((item, index) => (
                <div key={index} className="">
                  <Card item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-around  items-center mt-5 ">
          <div className="flex gap-10 lg:gap-32 items-center">
            <h1 className="font-semibold text-lg capitalize px-5 py-3">
              Acting
            </h1>
            <Dropdown
              title={"Category"}
              options={["tv", "movie"]}
              func={setcategory}
            />
          </div>

          <div className=" place-self-center list-disc text-zinc-400 w-[80%] h-[50vh] mt-5 overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.4)] border-2 border-zinc-700 p-5 rounded-md">
            {data[category + "credits"].cast.map((item, index) => (
              <li className="p-4 cursor-pointer hover:text-white hover:bg-black duration-500 rounded-md">
                <Link
                  to={`/${category}/detail/${item.id}`}
                  key={index}
                  className="flex flex-col"
                >
                  <span className="font-semibold">
                    {item.name ||
                      item.title ||
                      item.original_name ||
                      item.original_title}
                  </span>
                  <span>
                    Character name - {item.character && item.character}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>

        <div className="ml-7 md:ml-12 lg:ml-16 mt-7 flex flex-col space-y-3 py-5">
          <hr className=" h-[2px] border-none bg-zinc-600 w-[95%]" />
          <h1 className="text-xl lg:text-2xl xl:text-2xl font-bold">
            Person Info
          </h1>
          <div>
            <h1 className="text-lg lg:text-xl xl:text-xl font-medium">
              Known For
            </h1>
            <h1 className="text-sm  font-medium">
              {data.details.known_for_department}
            </h1>
          </div>
          <div>
            <h1 className="text-lg lg:text-xl xl:text-xl font-medium">
              Gender
            </h1>
            <h1 className="text-sm  font-medium">
              {data.details.gender === 2 ? "Male" : "Female"}
            </h1>
          </div>
          <div>
            <h1 className="text-lg lg:text-xl xl:text-xl font-medium">
              Birthday
            </h1>
            <h1 className="text-sm  font-medium">{data.details.birthday}</h1>
          </div>
          <div>
            <h1 className="text-lg lg:text-xl xl:text-xl font-medium">
              Place Of Birth
            </h1>
            <h1 className="text-sm  font-medium">
              {data.details.place_of_birth}
            </h1>
          </div>
          <div>
            <h1 className="text-lg lg:text-xl xl:text-xl font-medium">
              Also Known as
            </h1>
            <h1 className="text-sm  font-medium">
              {data.details.also_known_as}
            </h1>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Peopledetails;
