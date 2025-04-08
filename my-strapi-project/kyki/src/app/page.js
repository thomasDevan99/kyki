'use client';

import Image from "next/image";
import { useState } from "react";

const pullResults = [
  {
  _id: 1,
  rarityNum: 1,
  rarityName: "Common"
  },
  {
  _id: 2,
  rarityNum: 2,
  rarityName: "Uncommon"
  },
  {
  _id: 3,
  rarityNum: 3,
  rarityName: "Rare"
  },
  {
  _id: 4,
  rarityNum: 4,
  rarityName: "Super Rare"
  },
]

export default function Home() {
  const [pulled, setPulled] = useState(null)
  
  function pullBox() {
    
    const pullNum = Math.random() * 100;

    if (pullNum < 50) setPulled(1)
    if (pullNum > 50) setPulled(2)
    if (pullNum > 75) setPulled(3)
    if (pullNum > 95) setPulled(4)
    
    console.log(pullNum)
  }

  let pullText = 'You have not pulled for an item yet'
  if (pulled) {
    console.log('pulled', pulled);
    pullText = `YOU GOT A ${pullResults.find(res => res.rarityNum === pulled).rarityName} REWARD`
  } 

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

    
        <div className="sm:items-center justify-items-center">
              {pullText}
          <div className="flex items-center flex-col sm:flex-row">
            
            
            <button
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
              target="_blank"
              onClick={() => pullBox()}
              rel="noopener noreferrer"
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
            
          </div>
        </div>

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
