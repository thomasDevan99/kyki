import React, { useState } from "react";
import { motion } from "framer-motion";

const buttons = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const radius = 150;

export default function OrbitingPortal({show, pulledRarity}) {
  const [selected, setSelected] = useState(null);
  const [flipped, setFlipped] = useState(false);

  console.log('show', show);
  console.log('pulledRarity', pulledRarity);
  if (show == null) return


  const handleButtonClick = (id) => {
    if (selected === null) {
      setSelected(id);
    } else if (selected === id) {
      setFlipped((prev) => !prev);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 relative" style={{height: "0"}}>

      {/* Rotating Buttons */}
      {show &&
        buttons.map((id, index) => {
          const angle = (index / buttons.length) * 2 * Math.PI;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          const isSelected = selected === id;

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
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Flip Animation */}
              <motion.div
                animate={{
                  rotateY: isSelected && flipped ? 360 : 0,
                }}
                style={{
                  perspective: 1000,
                }}
                className="w-full h-full flex items-center justify-center"
              >
                <div className="w-full h-full backface-hidden" style={{alignContent: 'center'}}>
                  {isSelected && flipped ? pulledRarity : `?`}
                </div>
              </motion.div>
            </motion.button>
          );
        })}
    </div>
  );
}
