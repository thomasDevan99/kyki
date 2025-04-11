import React, { useState } from "react";
import { motion } from "framer-motion";

const buttons = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const radius = 150;

import { possibleResults } from "@/dataStructure/possibleResults";

export default function OrbitingPortal({setisIdle}) {
  const [selected, setSelected] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [pulled, setPulled] = useState()

  console.log('pulled', pulled);
  const handleButtonClick = (id) => {
    if (selected === null) {
      setSelected(id);
    } else if (selected === id) {
      setFlipped((prev) => {
        console.log('!prev', !prev);
        if (prev == true) setisIdle(true)
        return !prev
      });
    }
  };

  function pullBox() {
      const pullNum = Math.random() * 100;
      
      let temp

      if (pullNum < 50) temp = 1
      if (pullNum > 50) temp = 2
      if (pullNum > 75) temp = 3
      if (pullNum > 95) temp = 4
      
      setPulled(possibleResults.find(res => res.rarityNum === temp))
      
    }
  
  let pullText = 'You have not pulled for an item yet'
  if (selected) {
    pullText = `YOU GOT A ${pulled?.rarityName} REWARD`
  }


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 relative" style={{height: "0"}}>

      <div className="pb-106 sm:items-center justify-items-center">
        {pulled && pullText}
      </div>

      {/* Rotating Buttons */}
      {
        buttons.map((id, index) => {
          const angle = (index / buttons.length) * 2 * Math.PI;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          const isSelected = selected === id;
          const isRevealed = isSelected && flipped

          return (
            <motion.button
              key={id}
              className="absolute w-16 h-16 rounded-full bg-green-400 text-white flex items-center justify-center"
              onClick={() => handleButtonClick(id)}
              animate={{
                x: isSelected ? 0 : x,
                y: isSelected ? 0 : y,
                scale: isSelected ? 1.3 : 1,
                zIndex: isSelected ? 10 : 1,
                rotateY: isRevealed ? 1080 : 0,
              }}
              transition={{ type: "spring", stiffness: isRevealed ? 10 : 100, damping: isRevealed ? 3 : 20}}
            >
              {/* Flip Animation */}
              <motion.div
                style={{
                  perspective: 1000,
                }}
                onClick={() => isSelected && pullBox()}
                className="w-full h-full flex items-center justify-center"
              >
                <div className="w-full h-full backface-hidden text-black" style={{alignContent: 'center'}}>
                  {isSelected && flipped ? pulled?.shortName : `?`}
                </div>
              </motion.div>
            </motion.button>
          );
        })}
    </div>
  );
}
