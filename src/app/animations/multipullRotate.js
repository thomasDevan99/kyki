import React, { useState } from "react";
import { motion } from "framer-motion";
import { genFakePull } from "../helpers/pullMethods";

const buttons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];  // 10 buttons
const radius = 150;  // Radius of the orbit

export default function MultipullRotate({ flipped, setFlipped }) {

    // Handle button click (flip and select behavior)
    const handleButtonClick = () => {
        setFlipped((prev) => {
            if (prev) return prev
            return !prev;
        }); 
    };

    // Animation for each orbiting button
    const animationProps = (id, flipped, color) => {
        const angle = (id / buttons.length) * 2 * Math.PI;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        return {
        x: x,
        y: y,
        scale: flipped ? 1.3 : 1,
        zIndex: flipped ? 10 : 1,
        rotateY: flipped ? 1080 : 0,
        backgroundColor: ["#9CA3AF", color],
        };
    };

    // Transition props for animation
    const transitionProps = (flipped) => ({
        type: "spring",
        stiffness: flipped ? 10 : 100,
        damping: flipped ? 3 : 20,
    });
  
    return (
        <>
            {/* Orbiting buttons and central button */}
            <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
            {/* Orbiting Buttons Container */}
            <motion.div
            className="absolute w-full h-full flex justify-center items-center"
            animate={{ rotate: 360 }}
            transition={{
                repeat: Infinity,
                duration: 8,
                ease: "linear",
            }}
            >
            {/* Orbiting Buttons */}
            {buttons.map((id) => {
                const rarityFake = genFakePull(flipped);
                const color = flipped && rarityFake?.color

                return (
                <motion.button
                    key={id}
                    className="absolute w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-400 text-white flex items-center justify-center"
                    animate={animationProps(id, flipped, color)}
                    transition={transitionProps(flipped)}
                >
                    <motion.div
                    style={{ perspective: 1000 }}
                    className="w-full h-full flex items-center justify-center"
                    >
                    <div className="w-full h-full backface-hidden text-black flex items-center justify-center">
                        {flipped ? rarityFake.shortName : "?"}
                    </div>
                    </motion.div>
                </motion.button>
                );
            })}
            </motion.div>

            {/* Central Button */}
            {!flipped && <motion.button
            className="absolute w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center"
            onClick={() => {
                setFlipped(!flipped)
                handleButtonClick()
            }}  // Toggle flip on center button click
            animate={{ scale: flipped ? 1.2 : 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
                PULL
            </motion.button>}
        </div>

        </>
    );
}
