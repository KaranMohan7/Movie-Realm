import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import FetchData from '../../Utils/FetchData';
import VerticalCard from "../Common/VerticalCard";
import InfiniteScroll from "react-infinite-scroll-component";
import Navbar from "../Navbar";
import Dropdown from "../Common/Dropdown";
import Loading from "../Loading";


const Popular = () => {

  const [category, setcategory] = useState("movie");
    const [popular, setpopular] = useState([]);
    const [hasmore,sethasmore] = useState(true)
    const [page, setpage] = useState(1)
    const navigate = useNavigate()

 const popularCard = async () => {
    const data = await FetchData(
      `https://api.themoviedb.org/3/${category}/popular?page=${page}`
    );
   
    if(data.results.length > 0){
      setpopular((prev) => [...prev, ...data.results]);
      setpage(page + 1);
    }else{
      sethasmore(false)
    }
   
  };

  useEffect(() => {
    if(popular.length === 0){
      popularCard()
    }else{
      setpage(1)
      setpopular([])
      popularCard()
    }
  }, [category]);

  return popular.length > 0 ? (
    <div className="w-full">
    <div className="flex items-center justify-between  px-4  md:px-18 lg:px-24 xl:px-28">
      <div className="flex justify-center items-center gap-3">
        <i
          onClick={() => navigate(-1)}
          class="ri-arrow-left-line text-lg lg:text-xl"
        ></i>
        <p className="text-lg lg:text-2xl xl:text-xl font-semibold">
          Popular -<span className='text-xs '>({category})</span>
        </p>
      </div>
      <div>
        <Navbar />
      </div>
    </div>

    <div className=" flex justify-center items-center gap-5 mt-7">
      <Dropdown
        title={"Category"}
        options={["movie", "tv"]}
        func={setcategory}
      />
    </div>
    <InfiniteScroll
      dataLength={popular.length}
      loader={<Loading/>}
      next={popularCard}
      hasMore={hasmore}
    >
      <div className="flex flex-wrap justify-evenly items-center ">
        {popular.map((item, index) => (
          <div key={index}>
            <VerticalCard
               movie={category}
              item={item}
            />
          </div>
        ))}
      </div>
    </InfiniteScroll>
  </div>
) : <Loading/>
  
}

export default Popular