  import React, { useEffect, useState } from "react";
  import "./MoviesCardList.css";
  import MoviesCard from "../MoviesCard/MoviesCard";
  import Preloader from "../../Preloader/Preloader";

  export default function MoviesCardList({ moviesList, isLoading, errorMessage }) {
    const [displayCards, setDisplayCards] = useState(16);
    
    useEffect(() => {
      const updateDisplayCards = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1280) {
          setDisplayCards(16);
        } else if (screenWidth >= 768) {
          setDisplayCards(8);
        } else {
          setDisplayCards(5);
        }
      }
      
      updateDisplayCards();

      window.addEventListener('resize', updateDisplayCards);

      return () => {
        window.removeEventListener("resize", updateDisplayCards);
      };

    }, []);

    const cardsToShow = moviesList.slice(0, displayCards);

    const handleAddMoreCards = () => {
      setDisplayCards(displayCards + 4);
    } 

    if (isLoading) {
      return (<Preloader />)
    }
    return (
      <>
        <section className="movies-card-list">
            {cardsToShow.length > 0 ? 
            (cardsToShow.map((movie) => {
              return <MoviesCard key={movie.id} movie={movie} />;
            })) 
            : (<p className="movies-card-list__message">Ничего не найдено</p>)
            }
          {errorMessage}
        </section>
        <button onClick={handleAddMoreCards} className="movies-card-list__button">Еще</button>
      </>
    );
  }
