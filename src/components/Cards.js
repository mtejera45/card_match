import React, { useEffect } from "react";
import cardsData from "../cardsData"
import "../style.css"

export default function Cards(props){
    
    const[cards, setCards] = React.useState(cardsData)
    const[choiseOne, setChoiseOne] = React.useState(null)
    const[choiseTwo, setChoiseTwo] = React.useState(null)
    const[idCheckOne, setIdCheckOne] = React.useState(null)
    const[idCheckTwo, setIdCheckTwo] = React.useState(null)

    function handleClick(card){
        if(!choiseOne){
            setChoiseOne(card.value)
            setIdCheckOne(card.id)            
            document.getElementById(card.id).setAttribute('class', 'cardBackground-seleted');
        } if (choiseOne){
            setChoiseTwo(card.value)
            setIdCheckTwo(card.id)
            document.getElementById(card.id).removeAttribute('class', 'cardBackground-seleted');
        }
    }

    React.useEffect(()=>{
        if(choiseOne && choiseTwo){ 
            if(choiseOne === choiseTwo && idCheckOne !== idCheckTwo){
                document.getElementById(idCheckOne).setAttribute('class', 'cardBackground-right');
                document.getElementById(idCheckTwo).setAttribute('class', 'cardBackground-right');
                resetCards()
            }else {
                document.getElementById(idCheckOne).setAttribute('class', 'cardBackground-wrong');
                document.getElementById(idCheckTwo).setAttribute('class', 'cardBackground-wrong');
                setTimeout (() =>{
                    document.getElementById(idCheckOne).removeAttribute('class', 'cardBackground-wrong');
                    document.getElementById(idCheckTwo).removeAttribute('class', 'cardBackground-wrong');
                    document.getElementById(idCheckOne).setAttribute('class', 'cardBackground');
                    document.getElementById(idCheckTwo).setAttribute('class', 'cardBackground');
                    resetCards()
                }, 700);
            }}

        },[choiseOne, choiseTwo])
        
        function resetCards(){
        setChoiseOne(null)
        setChoiseTwo(null)
        setIdCheckOne(null)
        setIdCheckTwo(null)
        }

    const cardsDataArray = cards.map(card =>(
        <div
            key={card.id}
            id={card.id}
            value={card.value}
            className={"cardBackground"}
        >
            <img
                alt={card.alt}
                className="images"
                src={card.imgUrl} 
                onClick={()=>handleClick(card)}      
            />
        </div>
    ))      
    return (
        <div
            className="card-container"
        >
        {cardsDataArray}</div>
    )
    }
