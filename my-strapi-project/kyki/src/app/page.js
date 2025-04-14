'use client';

import Image from "next/image";
import { useState } from "react";
import RotateShowcase from "./rotateShowcase";

export default function Home() {
  const [isIdle, setisIdle] = useState(true);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen items-center justify-items-center px-4 sm:px-8 md:px-12 py-8 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full max-w-4xl flex flex-col items-center">
        {!isIdle && <RotateShowcase setisIdle={setisIdle} />}
        
        {isIdle && (
          <button
            className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-6"
            onClick={() => setisIdle(false)}
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Pull Now
          </button>
        )}
      </main>
    </div>
  );
}
