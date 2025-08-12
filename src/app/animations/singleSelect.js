import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { genFakePull } from "../helpers/pullMethods";

const buttons = [0,1,2,3,4,5,6,7,8,9];
const radius = typeof window !== "undefined" ? (window.innerWidth < 768 ? 100 : 150) : 150;

export default function SingleSelect({
  allReveal,
  pulled,
  setPulled,
  flipped,
  setFlipped,
  selected,
  setSelected,
}) {
  const [generatedPull, setGeneratedPull] = useState(null);
  const [allPulls, setAllPulls] = useState([]);

  // Generate pull for selected button only (if not allReveal)
  useEffect(() => {
    if (selected !== null && !flipped && !allReveal) {
      genFakePull().then(setGeneratedPull);
    }
  }, [selected, flipped, allReveal]);

  // Generate pulls for all buttons when allReveal becomes true
  useEffect(() => {
    if (allReveal) {
      Promise.all(buttons.map(() => genFakePull())).then(setAllPulls);
    } else {
      setAllPulls([]);
    }
  }, [allReveal]);

  const submitPull = async (pullData) => {
    if (!pullData) return;
    try {
      const res = await fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rarities: [pullData.shortName] }),
      });
      if (res.ok) return
      else alert("Failed to submit entry");
    } catch {
      alert("Error submitting entry");
    }
  };

  const handleButtonClick = (id) => {
    if (selected === null) {
      setSelected(id);
    } else if (selected === id && !flipped) {
      setFlipped(true);
      submitPull(generatedPull);
      setPulled(generatedPull);
    }
  };

  const animationProps = (id, isSelected, isRevealed, color) => {
    const angle = (id / buttons.length) * 2 * Math.PI;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    if (!flipped && !allReveal) {
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
      };
    }
  };

  const transitionProps = (isRevealed) => {
    if (!flipped && !allReveal) {
      return {
        type: "spring",
        stiffness: isRevealed ? 10 : 100,
        damping: isRevealed ? 3 : 20,
      };
    } else {
      return {
        duration: 2,
        ease: "easeInOut",
        repeat: 0,
        repeatType: "loop",
      };
    }
  };

  return (
    <>
      <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        {buttons.map((id) => {
  const isSelected = selected === id;
  const isRevealed = (isSelected && flipped) || allReveal;

  // Use generatedPull for selected, allPulls for others (if allReveal)
  const pullData = isSelected
    ? generatedPull
    : allReveal
    ? allPulls[id]
    : null;

  const color = pullData?.color || "#9CA3AF";

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
        className="w-full h-full flex items-center justify-center"
      >
        <div className="w-full h-full backface-hidden text-black flex items-center justify-center">
          {isRevealed ? pullData?.shortName : "?"}
        </div>
      </motion.div>
    </motion.button>
  );
})}

      </div>
    </>
  );
}
