import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import FetchData from '../../Utils/FetchData';
import VerticalCard from "../Common/VerticalCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link} from "react-router-dom";
import Navbar from "../Navbar";
import Dropdown from "../Common/Dropdown";
import Loading from '../Loading'

const Movie = () => {
    const [category, setcategory] = useState("now_playing");
    const [movie, setmovie] = useState([]);
    const [hasmore,sethasmore] = useState(true)
    const [page, setpage] = useState(1)
    const navigate = useNavigate()

    const movieCard = async () => {
        const data = await FetchData(
          `https://api.themoviedb.org/3/movie/${category}?page=${page}`
        );
   
        if(data.results.length > 0){
          setmovie((prev) => [...prev, ...data.results]);
          setpage(page + 1);
        }else{
          sethasmore(false)
        }
       
      };
    
      useEffect(() => {
        if(movie.length === 0){
          movieCard()
        }else{
          setpage(1)
          setmovie([])
          movieCard()
        }
      }, [category]);
    
      return movie.length > 0 ? (
        <div className="w-full">
        <div className="flex items-center justify-between  px-4  md:px-18 lg:px-24 xl:px-28">
          <div className="flex justify-center items-center gap-3">
            <i
              onClick={() => navigate(-1)}
              class="ri-arrow-left-line text-lg lg:text-xl"
            ></i>
            <p className="text-lg lg:text-xl xl:text-2xl font-semibold capitalize">
             Movies - <span className='text-xs lg:text-sm'>({category})</span>
            </p>
          </div>
          <div>
            <Navbar />
          </div>
        </div>
    
        <div className=" flex justify-center items-center gap-5 mt-7">
          <Dropdown
            title={"Category"}
            options={["popular", "top_rated","upcoming","now_playing"]}
            func={setcategory}
          />
        </div>
        <InfiniteScroll
          dataLength={movie.length}
          loader={<Loading/>}
          next={movieCard}
          hasMore={hasmore}
        >
          <div className="flex flex-wrap justify-evenly items-center ">
            {movie.map((item, index) => (
              <div key={index}>
                <VerticalCard movie={'movie'}
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