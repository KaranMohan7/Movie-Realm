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
    const [category, setcategory] = useState("popular");
    const [people, setpeople] = useState([]);
    const [hasmore,sethasmore] = useState(true)
    const [page, setpage] = useState(1)
    const navigate = useNavigate()

    const peopleCard = async () => {
        const data = await FetchData(
          `https://api.themoviedb.org/3/person/${category}?page=${page}`
        );
   console.log(data.results)
        if(data.results.length > 0){
          setpeople((prev) => [...prev, ...data.results]);
          setpage(page + 1);
        }else{
          sethasmore(false)
        }
       
      };
    
      useEffect(() => {
        if(people.length === 0){
          peopleCard()
        }else{
          setpage(1)
          setpeople([])
          peopleCard()
        }
      }, [category]);
    
      return people.length > 0 ? (
        <div className="w-full">
        <div className="flex items-center justify-between  px-4  md:px-18 lg:px-24 xl:px-28">
          <div className="flex justify-center items-center gap-3">
            <i
              onClick={() => navigate(-1)}
              class="ri-arrow-left-line text-lg lg:text-xl"
            ></i>
            <p className="text-lg lg:text-2xl xl:text-xl font-semibold capitalize">
             Peoples - <span className='text-xs lg:text-sm'>({category})</span>
            </p>
          </div>
          <div>
            <Navbar />
          </div>
        </div>
    
        <div className=" flex justify-center items-center gap-5 mt-7">
          <Dropdown
            title={"Category"}
            options={["popular"]}
            func={setcategory}
          />
        </div>
        <InfiniteScroll
          dataLength={people.length}
          loader={<Loading/>}
          next={peopleCard}
          hasMore={hasmore}
        >
          <div className="flex flex-wrap justify-evenly items-center ">
            {people.map((item, index) => (
              <div key={index}>
                <VerticalCard
                  item={item}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    ) : < Loading/>
}

export default Movie