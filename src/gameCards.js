import React from 'react';
import SingleCard from './card.js';


function GameCards({gameCards}) {


  function allExploreCard(gameCards) {
    var gameList = [ ["Amanda", "Jeremy", "gameLink1", 20], ["Maze Wagon", "Raymond", "gameLink2", 30] ]

       return (
         <div>
       {Object.keys(gameList).map(function(key) {
          return < SingleCard
          name = {gameList[key][0]}
          author = {gameList[key][1]}
          gameLink = {gameList[key][2]}
          numberOfLikes = {gameList[key][3]}
          />
        })}
        </div>
      );
   }


  return (
      allExploreCard()
    );

}

export default GameCards;