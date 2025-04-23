import React, { useState } from "react";
import { motion } from "framer-motion";
import { genFakePull, pullBox } from "../helpers/pullMethods";

const buttons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];


export default function SingleSelect({ allReveal, pulled, setPulled, flipped, setFlipped, selected, setSelected }) {

  const handleButtonClick = (id) => {
    if ((selected === null)) {
      setSelected(id);
    } else if (selected === id) {
      setFlipped((prev) => {
        if (prev) return prev
        return !prev;
      });
    }
  };

  const animationProps = (id, isSelected, isRevealed, color) => {
    const angle = (id / buttons.length) * 2 * Math.PI;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    if (!flipped) {

      return {
        x: isSelected ? 0 : x,
        y: isSelected ? 0 : y,
        scale: isSelected ? 1.3 : 1,
        zIndex: isSelected ? 10 : 1,
        rotateY: isRevealed ? 1080 : 0,
      };
    } else {

      return {
        scale: [1, 1.05, 1],
        x: isSelected ? 0 : x,
        y: isSelected ? 0 : y,
        rotateY: isRevealed ? 1080 : 0,
        backgroundColor: ["#9CA3AF", color],
      }
    }
  };

  const transitionProps = (isRevealed) => {
    if (!flipped) {
      return {
      type: "spring",
      stiffness: isRevealed ? 10 : 100,
      damping: isRevealed ? 3 : 20,
      }
    } else {
        return {
          duration: 2,
          ease: "easeInOut",
          repeat: 0,
          repeatType: "loop",
        }
    }
  };

  const pullText = selected != null ? `YOU GOT A ${pulled?.rarityName} REWARD` : 'You have not pulled for an item yet';

  const radius = typeof window !== "undefined"
    ? window.innerWidth < 768
      ? 100 // smaller radius for mobile/tablet
      : 150
    : 150;


  return (
    <>
      <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        {buttons.map((id, index) => {
          const angle = (index / buttons.length) * 2 * Math.PI;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
      

          const isSelected = selected === id;
          const isRevealed = isSelected && flipped || allReveal;


          const rarityFake = genFakePull(allReveal, flipped)

          const color = isSelected ? pulled?.color : allReveal && rarityFake?.color

          return (
            <motion.button
              key={id}
              className="absolute w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-400 text-white flex items-center justify-center"
              onClick={() => handleButtonClick(id)}
              animate={animationProps(id, isSelected, isRevealed, color)}
              transition={transitionProps(isRevealed)}
            >
              <motion.div
                style={{ perspective: 1000 }}
                onClick={() => isSelected && pullBox(pulled, setPulled)}
                className="w-full h-full flex items-center justify-center"
              >
                <div className="w-full h-full backface-hidden text-black flex items-center justify-center">
                  {isSelected && flipped ? pulled?.shortName : allReveal ? rarityFake.shortName : "?"}
                </div>
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      
    </>
  );
}
