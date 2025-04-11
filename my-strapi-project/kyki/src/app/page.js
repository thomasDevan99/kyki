'use client';

import Image from "next/image";
import { useState } from "react";
// import Rotate from "./animations";
import RotateShowcase from "./rotateShowcase"
import { possibleResults } from "@/dataStructure/possibleResults";

export default function Home() {
  const [pulled, setPulled] = useState(null)
  
  function pullBox() {
    
    const pullNum = Math.random() * 100;
    
    let temp

    if (pullNum < 50) temp = 1
    if (pullNum > 50) temp = 2
    if (pullNum > 75) temp = 3
    if (pullNum > 95) temp = 4

    setPulled(possibleResults.find(res => res.rarityNum === temp))
    
    console.log(pullNum)
  }
  
  let pullText = 'You have not pulled for an item yet'
  if (pulled) {
    
    pullText = `YOU GOT A ${pulled.rarityName} REWARD`
  } 

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            

      <main className="gap-[32px] row-start-2 items-center sm:items-start">
      
      <div className="pb-56 sm:items-center justify-items-center">
        {pulled && pullText}
      </div>

        <div className="sm:items-center justify-items-center">
              {pulled && <RotateShowcase 
              show={pulled?.rarityNum}
              pulledRarity={pulled.shortName}
              setShow={setPulled}

            />}
          <div className="flex items-center flex-col sm:flex-row">
            
            
            {!pulled && <button
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
            </button>}
            
          </div>
        </div>

      </main>
      {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
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
      </footer> */}
    </div>
  );
}
