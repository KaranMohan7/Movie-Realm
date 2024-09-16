import { addpeople } from "../Reducers/peopleSlice";
import FetchData from "../../Utils/FetchData";

export const detailApipeople = (id) => {
  return async function Fetchmoviethunk(dispatch) {
    const details = await FetchData(
      `https://api.themoviedb.org/3/person/${id}`
    );

    const external = await FetchData(
      `https://api.themoviedb.org/3/person/${id}/external_ids`
    );
    const credits = await FetchData(
      `https://api.themoviedb.org/3/person/${id}/combined_credits`
    );
    const tvcredits = await FetchData(
      `https://api.themoviedb.org/3/person/${id}/tv_credits`
    );
    const moviecredits = await FetchData(
      `https://api.themoviedb.org/3/person/${id}/movie_credits`
    );
    const wholedata = {
      details: details,
      external: external,
      credits: credits,
      tvcredits: tvcredits,
      moviecredits: moviecredits
    };
    dispatch(addpeople(wholedata));
  };
};
