import React, { useState } from "react";
import { motion } from "framer-motion";
import { genFakePull, pullBox } from "./helpers/pullMethods";
import MultipullRotate from "./animations/multipullRotate";
import SingleSelect from "./animations/singleSelect";

const buttons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];


export default function OrbitingPortal({ setisIdle, numberOfPulls }) {
  const [selected, setSelected] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [pulled, setPulled] = useState();
  const [allReveal, setAllReveal] = useState(false)

  

  const reset = () => {
    setSelected(null)
    setFlipped(false)
    setPulled()
    setisIdle(true)
    setAllReveal(false)
  }

  const pullText = selected != null ? `YOU GOT A ${pulled?.rarityName} REWARD` : 'You have not pulled for an item yet';

  const radius = typeof window !== "undefined"
    ? window.innerWidth < 768
      ? 100 // smaller radius for mobile/tablet
      : 150
    : 150;


  return (
    <>
      <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        {numberOfPulls === 1 ? 
        <SingleSelect allReveal={allReveal} pulled={pulled} setPulled={setPulled} flipped={flipped} setFlipped={setFlipped} selected={selected} setSelected={setSelected}/> : 
        <MultipullRotate flipped={flipped} setFlipped={setFlipped} /> }       
      </div>

      <div className="text-center text-base sm:text-lg">
        {pulled && pullText}
      </div>

      <div className="sm:items-center justify-items-center grid grid-cols-2 gap-10">
        {(pulled || numberOfPulls == 10 && flipped) &&
        <motion.button className="rounded-full bg-white text-black flex items-center justify-center" 
          onClick={() => reset()}
        >
          <div className="p-4">
              Pull Again
          </div>
        </motion.button>
        }
        {pulled && !allReveal &&
        <motion.button className="rounded-full bg-white text-black flex items-center justify-center" 
          onClick={() => setAllReveal(true)}
        >
          <div className="p-4">
              Reveal All
          </div>
        </motion.button>
        }
        
      </div>
    </>
  );
}
