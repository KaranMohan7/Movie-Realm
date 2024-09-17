import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import FetchData from '../../Utils/FetchData';
import VerticalCard from "../Common/VerticalCard";
import InfiniteScroll from "react-infinite-scroll-component";
import Navbar from "../Navbar";
import Dropdown from "../Common/Dropdown";
import Loading from "../Loading";

const Movie = () => {
    const [category, setcategory] = useState("top_rated");
    const [tv, settv] = useState([]);
    const [hasmore,sethasmore] = useState(true)
    const [page, setpage] = useState(1)
    const navigate = useNavigate()

    const tvCard = async () => {
        const data = await FetchData(
          `https://api.themoviedb.org/3/tv/${category}?page=${page}`
        );
   
        if(data.results.length > 0){
          settv((prev) => [...prev, ...data.results]);
          setpage(page + 1);
        }else{
          sethasmore(false)
        }
       
      };
    
      useEffect(() => {
        if(tv.length === 0){
          tvCard()
        }else{
          setpage(1)
          settv([])
          tvCard()
        }
      }, [category]);
    
      return tv ? (
        <div className="w-full">
        <div className="flex items-center justify-between  px-4  md:px-18 lg:px-24 xl:px-28">
          <div className="flex justify-center items-center gap-3">
            <i
              onClick={() => navigate(-1)}
              class="ri-arrow-left-line text-lg lg:text-xl"
            ></i>
            <p className="text-lg lg:text-2xl xl:text-xl font-semibold capitalize">
             TV SHOWS -<span className='text-xs'>({category})</span>
            </p>
          </div>
          <div>
            <Navbar />
          </div>
        </div>
    
        <div className=" flex justify-center items-center gap-5 mt-7">
          <Dropdown
            title={"Category"}
            options={["airing_today", "on_the_air","popular","top_rated"]}
            func={setcategory}
          />
        </div>
        <InfiniteScroll
          dataLength={tv.length}
          loader={<Loading/>}
          next={tvCard}
          hasMore={hasmore}
        >
          <div className="flex flex-wrap justify-evenly items-center ">
            {tv.map((item, index) => (
              <div key={index}>
                <VerticalCard
                tv={'tv'}
                  item={item}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    ) : <Loading/>
}

export default Movie