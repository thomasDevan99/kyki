import React, { useState } from "react";
import { motion } from "framer-motion";
import { possibleResults } from "@/dataStructure/possibleResults";

const buttons = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export default function OrbitingPortal({ setisIdle }) {
  const [selected, setSelected] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [pulled, setPulled] = useState();

  const handleButtonClick = (id) => {
    if (selected === null) {
      setSelected(id);
    } else if (selected === id) {
      setFlipped((prev) => {
        return !prev;
      });
    }
  };

  const reset = () => {
    setSelected(null)
    setFlipped(false)
    setPulled()
    setisIdle(true)
  }

  const pullBox = () => {
    if (pulled) return

    const pullNum = Math.random() * 100;
    let temp;

    if (pullNum < 50) temp = 1;
    if (pullNum > 50) temp = 2;
    if (pullNum > 75) temp = 3;
    if (pullNum > 95) temp = 4;

    setPulled(possibleResults.find((res) => res.rarityNum === temp));
  };

  const pullText = selected ? `YOU GOT A ${pulled?.rarityName} REWARD` : 'You have not pulled for an item yet';

  const radius = typeof window !== "undefined"
    ? window.innerWidth < 768
      ? 100 // smaller radius for mobile/tablet
      : 150
    : 150;

  return (
    <>
      
      <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Orbiting Buttons */}
        {buttons.map((id, index) => {
          const angle = (index / buttons.length) * 2 * Math.PI;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
      

          const isSelected = selected === id;
          const isRevealed = isSelected && flipped;

          return (
            <motion.button
              key={id}
              className="absolute w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-400 text-white flex items-center justify-center"
              onClick={() => handleButtonClick(id)}
              animate={{
                x: isSelected ? 0 : x,
                y: isSelected ? 0 : y,
                scale: isSelected ? 1.3 : 1,
                zIndex: isSelected ? 10 : 1,
                rotateY: isRevealed ? 1080 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: isRevealed ? 10 : 100,
                damping: isRevealed ? 3 : 20,
              }}
            >
              <motion.div
                style={{ perspective: 1000 }}
                onClick={() => isSelected && pullBox()}
                className="w-full h-full flex items-center justify-center"
              >
                <div className="w-full h-full backface-hidden text-black flex items-center justify-center">
                  {isSelected && flipped ? pulled?.shortName : "?"}
                </div>
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      <div className="text-center text-base sm:text-lg">
        {pulled && pullText}
      </div>

      <div className="sm:items-center justify-items-center">
        {pulled &&
        <motion.button className="rounded-full bg-white text-black flex items-center justify-center" 
          onClick={() => reset()}
        >
          <div className="p-4">
              Pull Again
          </div>
        </motion.button>
        }
      </div>
    </>
  );
}
