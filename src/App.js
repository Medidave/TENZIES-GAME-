import './App.css';
import Dice from './components/Dice';
import { useState, useEffect } from 'react';
import {nanoid} from "nanoid"
import Confetti from 'react-confetti';



function App() {

  const [dice, setDice] = useState(allDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect( () => {
    // console.log("Dice state changed")
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue){
      setTenzies(true)
      console.log("DAVE THE CEO")
    }
   
  }, [dice])

  const diceElements = dice.map(die => (
  <Dice 
  value={die.value}
  key={die.id}
  id={die.id}
  selectedDice={() => selectedDice(die.id)}
  isHeld={die.isHeld}
  />
))

  function resetGame(){
    // console.log("Dave the ceo")
    setDice(allDice())
    setTenzies(false)
  }


  function generateNewDice(){
    return { 
        value: Math.floor(Math.random()*7),
        isHeld:false,
        id:nanoid()
      }
  }

  function allDice(){
    const randNumbers = [];
    for(let i=0; i<10;i++){
      //DAVE NOTE THAT THE ARRAY WILL BE GENERATED AGAIN IN THE CODE AND SO TO PREVENT REPEATING THE SAME BLOCK OF CODE, THE FUNCTION GENERATENEWDICE WAS CREATED SO THAT IT CAN GENERATE A NEW DICE
      // YOU CAN USE THE SAME FUNCTION TO GENERATE THE DICE BELOW.
      let rand = Math.floor(Math.random()*7);
      const randObj = {
        value:rand,
        isHeld:false,
        id:nanoid()
      }
      randNumbers.push(randObj);

      // THE ABOVE ENTIRE LINE OF CODE COULD BE SIMPLIFY THIS WAY
      // randNumbers.push({
      //   value:Math.floor(Math.random()*7),
      //   isHeld:false
      // });

    }

    // console.log(randNumbers)
    return randNumbers
  
  }


  function rollDice(){
    setDice(oldDice => oldDice.map(dice => {
      return dice.isHeld ?
       dice : 
       generateNewDice()
    }))
  }

  function selectedDice(id) {
    console.log(id)
    setDice(oldDice => oldDice.map(dice => {
      return dice.id === id ? 
      {...dice, isHeld: !dice.isHeld} : 
      dice
    }))

  }


  return (
    <main>
      <div className="confetti-container">
        {tenzies && <Confetti />}
      </div>
      <div className="Title">
      <h1>Tenzies</h1>
      <h3>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h3>
      </div>
      <div className="dice">
      {diceElements}
      </div>

      <button className='roll' onClick={tenzies ? resetGame : rollDice}>{`${tenzies ? "New Game" : "Roll"}`}</button>
    </main>
  );
}

export default App;
