import React, { useEffect } from "react";
import cardsData from "../cardsData"
import "../style.css"

export default function Cards(props){
    
    const[cards, setCards] = React.useState(cardsData)
    const[choiseOne, setChoiseOne] = React.useState(null)
    const[choiseTwo, setChoiseTwo] = React.useState(null)
    const[idCheckOne, setIdCheckOne] = React.useState(null)
    const[idCheckTwo, setIdCheckTwo] = React.useState(null)



    console.log(cards)
    console.log("one: " + choiseOne)
    console.log("two: " + choiseTwo)
    console.log("IDone: " + idCheckOne)
    console.log("IDtwo: " + idCheckTwo)

    function handleClick(card){
        if(!choiseOne){
            setChoiseOne(card.value)
            setIdCheckOne(card.id)
        } if (choiseOne){
            setChoiseTwo(card.value)
            setIdCheckTwo(card.id)
        }
    }

    React.useEffect(()=>{
        if(choiseOne && choiseTwo){ 
            if(choiseOne === choiseTwo && idCheckOne !== idCheckTwo){
                setCards(prevCards =>{
                    return prevCards.map(card =>{
                        if(card.value === choiseOne){
                            return{ ...card,
                                    imgStatus: "cardBackground-right",
                                    click: false
                                }
                        } else {
                            return card
                        }
                    })
                })
                resetCards()
                              
            } else {
                resetCards()
            } 
            
            if (choiseOne !== choiseTwo && idCheckOne !== idCheckTwo) {
                setCards(prevCards =>{
                    return prevCards.map(card =>{
                        if(card.id === idCheckOne){
                            return{ ...card,
                                    imgStatus: "cardBackground-wrong"}
                        } if(card.id === idCheckTwo){
                            return{ ...card,
                                    imgStatus: "cardBackground-wrong"}
                        }
                        else {
                            return card
                        }
                    })
                })
                resetCards()
            } else{
                resetCards()
            }
        }
    },[choiseOne, choiseTwo])

    function resetCards(){
        setChoiseOne(null)
        setChoiseTwo(null)
        setIdCheckOne(null)
        setIdCheckTwo(null)
    }

    const cardsDataArray = cards.map(card =>(
        <div
            className={card.imgStatus}  
            key={card.id}
        >
            <img
                alt={card.alt}
                className="images"
                src={card.imgUrl} 
                onClick={card.click? ()=>handleClick(card) : null}
            />
        </div>
    ))
              
    return (
        <div
            className="card-container"
        >{cardsDataArray}</div>
    )
}
