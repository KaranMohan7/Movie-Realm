import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen">
      <div className="flex items-center gap-6 md:gap-8 lg:gap-10 xl:gap-10 py-5 px-[10%] ">
        <i
          onClick={() => navigate(-1)}
          class="ri-arrow-left-line text-lg lg:text-xl"
        ></i>
      </div>
      <h1 className="text-center capitalize text-2xl md:text-3xl lg:text-5xl font-semibold">
        About Movie Realm
      </h1>
      <div className="text-xl text-center  p-10">
        <span className="font-bold">Movie Realm</span> is a comprehensive movie
        and TV show browsing platform developed with React, Tailwind CSS, and
        Redux. It offers a dynamic user experience with infinite scrolling,
        allowing users to explore an extensive library of movies and TV shows
        seamlessly. The application provides detailed information about movies,
        TV shows, actors, and more, enhancing user engagement and interaction.
        Leveraging Redux for state management ensures a smooth and responsive
        experience, even with large datasets. Designed with Tailwind CSS, the UI
        is both scalable and responsive, providing an optimal viewing experience
        across all devices.
      </div>
      <div className="text-xl text-center px-7 ">
        In addition to its browsing capabilities,{" "}
        <span className="font-bold">Movie Realm</span> offers detailed
        information about each movie and TV show, including synopses, ratings,
        genres, and cast members. Users can dive deeper into the world of cinema
        by accessing individual actor profiles, discovering their roles across
        various projects, and learning more about their careers. The integration
        of Redux for state management plays a crucial role in ensuring that the
        platform handles large datasets efficiently, providing users with a
        smooth and responsive interface that remains fast even as more content
        is loaded.
      </div>
      <div className="text-xl text-center py-12  px-7 ">
      <span className="font-bold">Movie Realm</span> is more than just a browsing tool; it is an immersive
        entertainment hub that aims to elevate the movie and TV show exploration
        experience by offering users everything they need in one place. With its
        robust architecture and attention to user experience, Movie Realm stands
        out as a go-to platform for movie enthusiasts and TV show aficionados
        alike.
      </div>
    </div>
  );
};

export default About;
