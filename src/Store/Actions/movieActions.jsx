import { addata} from "../Reducers/movieSlice";
import FetchData from "../../Utils/FetchData";

export const detailApi = (id) => {
  return async function Fetchmoviethunk(dispatch) {
   

    const details = await FetchData(`https://api.themoviedb.org/3/movie/${id}`);

    const external = await FetchData(
      `https://api.themoviedb.org/3/movie/${id}/external_ids`
    );

    const recommendations = await FetchData(
      `https://api.themoviedb.org/3/movie/${id}/recommendations`
    );
    const similar = await FetchData(
      `https://api.themoviedb.org/3/movie/${id}/similar`
    );
    const videos = await FetchData(
      `https://api.themoviedb.org/3/movie/${id}/videos`
    );
    const watchprovider = await FetchData(
      `https://api.themoviedb.org/3/movie/${id}/watch/providers`
    );
    const translation = await FetchData(
      `https://api.themoviedb.org/3/movie/${id}/translations`
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
    dispatch(addata(wholedata));
  

  };
};
