import { addatatv } from "../Reducers/tvSlice";
import FetchData from "../../Utils/FetchData";

export const detailApitv = (id) => {
  return async function Fetchmoviethunk(dispatch) {
   

    const details = await FetchData(`https://api.themoviedb.org/3/tv/${id}`);

    const external = await FetchData(
      `https://api.themoviedb.org/3/tv/${id}/external_ids`
    );

    const recommendations = await FetchData(
      `https://api.themoviedb.org/3/tv/${id}/recommendations`
    );
    const similar = await FetchData(
      `https://api.themoviedb.org/3/tv/${id}/similar`
    );
    const videos = await FetchData(
      `https://api.themoviedb.org/3/tv/${id}/videos`
    );
    const watchprovider = await FetchData(
      `https://api.themoviedb.org/3/tv/${id}/watch/providers`
    );
    const translation = await FetchData(
      `https://api.themoviedb.org/3/tv/${id}/translations`
    );
    const wholedata = {
      details: details,
      external: external,
      recommendations: recommendations.results,
      similar: similar.results,
      videos: videos.results.find((m) => m.type === "Trailer"),
      watchprovider: watchprovider.results.IN,
      translation: translation.translations.map((c) => c.name),
    };
    dispatch(addatatv(wholedata));
  
   
  };
};
