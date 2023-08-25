    import React, { useEffect, useState } from "react";
    import "./MoviesCardList.css";
    import MoviesCard from "../MoviesCard/MoviesCard";
    import Preloader from "../../Preloader/Preloader";

    export default function MoviesCardList({ moviesList, isLoading, errorMessage }) {
      const [displayCards, setDisplayCards] = useState(16);
      const cardsToShow = moviesList.slice(0, displayCards);

      //** изменение кол-ва карточек в зависимости от ширины экрана */
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
        //** изминение кол-ва при монтировании компонента */
        updateDisplayCards();
        
        //** изменение кол-ва карточек в зав-ти от размера окна */
        window.addEventListener('resize', () => {
          console.log(window.innerWidth)
          updateDisplayCards();
        });

        return () => {
          window.removeEventListener("resize", updateDisplayCards);
        };

      }, []);

      // const cardsToShow = moviesList.slice(0, displayCards);
      
      //** добавление карточек из списка */
      const handleAddMoreCards = () => {
        setDisplayCards(window.innerWidth > 768 ? displayCards + 4 : displayCards + 2);
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
          {moviesList.length > cardsToShow.length ?
          (<button onClick={handleAddMoreCards} className="movies-card-list__button">
            Еще
          </button>)
          :
          null
          }
        </>
      );
    }
