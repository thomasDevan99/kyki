import { possibleResults } from "@/dataStructure/possibleResults";

export const pullBox = (pullData, setPullData) => {
    if (pullData) return
    const pullNum = Math.random() * 100;
    
    const temp = possibleResults.find((res, index) => {
      const minChance = index === 0 ? 0 : possibleResults.slice(0, index).reduce((acc, val) => acc + val.chance, 0);
      const maxChance = minChance + res.chance;
      return pullNum >= minChance && pullNum < maxChance;
    });

    temp && setPullData(temp)
  };

  export const genFakePull = (allReveal, ogRevealed) => {
    if (!allReveal && !ogRevealed) return

    const pullNum = Math.random() * 100;
    
     const temp = possibleResults.find((res, index) => {
      const minChance = index === 0 ? 0 : possibleResults.slice(0, index).reduce((acc, val) => acc + val.chance, 0);
      const maxChance = minChance + res.chance;
      return pullNum >= minChance && pullNum < maxChance;
    });

    return temp
  }
