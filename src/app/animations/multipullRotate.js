"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { genMultiplePulls } from "../helpers/pullMethods";

const buttons = [...Array(10).keys()]; // [0..9]

const radius =
  typeof window !== "undefined"
    ? window.innerWidth < 768
      ? 100
      : 150
    : 150;

export default function MultipullRotate({ flipped, setFlipped }) {
  const [pullResults, setPullResults] = useState([]);

  const handlePull = async () => {
    // Generate 10 pulls
    const pulls = await genMultiplePulls(10);
    setPullResults(pulls);
    setFlipped(true);

    // Send all rarities in one batch to API
    const rarities = pulls.map((p) => p.shortName);

    const res = await fetch("/api/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rarities }),
    });

    if (res.ok) {
    //   alert("Entries submitted!");
    } else {
      alert("Failed to submit entries");
    }
  };

  const animationProps = (id, flipped, color) => {
    const angle = (id / buttons.length) * 2 * Math.PI;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    return {
      x,
      y,
      scale: flipped ? 1.3 : 1,
      zIndex: flipped ? 10 : 1,
      rotateY: flipped ? 1080 : 0,
      backgroundColor: ["#9CA3AF", color],
    };
  };

  const transitionProps = (flipped) => ({
    type: "spring",
    stiffness: flipped ? 10 : 100,
    damping: flipped ? 3 : 20,
  });

  return (
    <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Orbiting Buttons Container */}
      <motion.div
        className="absolute w-full h-full flex justify-center items-center"
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "linear",
        }}
      >
        {/* Orbiting Buttons */}
        {buttons.map((id) => {
          const rarityFake = pullResults[id];
          const color = flipped && rarityFake?.color;

          return (
            <motion.button
              key={id}
              className="absolute w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-400 text-white flex items-center justify-center"
              animate={animationProps(id, flipped, color)}
              transition={transitionProps(flipped)}
            >
              <motion.div
                style={{ perspective: 1000 }}
                animate={{ rotate: -360 }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "linear",
                }}
                className="w-full h-full flex items-center justify-center"
              >
                <div className="w-full h-full backface-hidden text-black flex items-center justify-center">
                  {flipped ? rarityFake?.shortName : "?"}
                </div>
              </motion.div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Central Button */}
      {!flipped && (
        <motion.button
          className="absolute w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center"
          onClick={handlePull}
          animate={{ scale: flipped ? 1.2 : 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          PULL
        </motion.button>
      )}
    </div>
  );
}
