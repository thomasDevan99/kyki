'use client';

import Image from "next/image";
import { useState } from "react";
import RotateShowcase from "./rotateShowcase";
import { motion } from "framer-motion";

export default function Home() {
  const [isIdle, setisIdle] = useState(true);
  const [pullNum, setPullNum] = useState(1);

  return (
    <div className="content-center min-h-screen items-center justify-items-center px-4 sm:px-8 md:px-12 py-8 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full max-w-4xl flex flex-col items-center">
        {!isIdle && <RotateShowcase setisIdle={setisIdle} numberOfPulls={pullNum} />}
        {isIdle && (
          <motion.button
            className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-6"
            onClick={() => setisIdle(false)}
            animate={{
              y: [0, -4, 0],       // float up and back down
              scale: [1, 1.05, 1], // slight breathing effect
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Pull 1
          </motion.button>
        )}
        {isIdle && (
          <motion.button
            className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-6"
            onClick={() => {
              setisIdle(false)
              setPullNum(10)
            }}
            animate={{
              y: [0, -4, 0],       // float up and back down
              scale: [1, 1.05, 1], // slight breathing effect
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Pull 10
          </motion.button>
        )}
      </main>
    </div>
  );
}
