import React from 'react'

function Dice({value, selectedDice, isHeld, id}) {

   

  return (
    <div className={`dices ${isHeld ? `green` : ''}`} onClick={selectedDice}>
        <h1>{value}</h1>
    </div>
  )
}

export default Dice