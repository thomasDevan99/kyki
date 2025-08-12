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

export async function genFakePull() {
  const pullNum = Math.random() * 100;

  const temp = possibleResults.find((res, index) => {
    const minChance =
      index === 0
        ? 0
        : possibleResults
            .slice(0, index)
            .reduce((acc, val) => acc + val.chance, 0);
    const maxChance = minChance + res.chance;
    return pullNum >= minChance && pullNum < maxChance;
  });

  return temp;
}


  // Generate N pulls at once
export async function genMultiplePulls(count = 10) {
  const pulls = [];
  for (let i = 0; i < count; i++) {
    const pull = await genFakePull();
    pulls.push(pull);
  }

  // if 10 pulls or more
  if (count >= 10) {
    const hasHighRank = pulls.some(pull =>
    ["A", "S", "SS"].includes(pull.shortName)
    )

    //Make at least 1 an A rank
    if (!hasHighRank) {
      const aRankItems = possibleResults.filter(item => item.shortName === "A");
      
      const randomIndex = Math.floor(Math.random() * aRankItems.length);
      
      const pullReplacement = aRankItems[randomIndex];
      const randomIndexReplace = Math.floor(Math.random() * count)
      pulls[randomIndexReplace] = pullReplacement

    }
  }

  return pulls;
}

