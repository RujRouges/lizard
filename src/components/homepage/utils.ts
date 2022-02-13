import { ExpressionsType } from ".";

export const moreVisibleEmotion = (emotions: ExpressionsType) => {
  const maxValue = Math.max(...Object.values(emotions));

  const emotion = Object.keys(emotions).find(
    (key) => emotions[key as keyof ExpressionsType] === maxValue
  );

  return emotion;
};
