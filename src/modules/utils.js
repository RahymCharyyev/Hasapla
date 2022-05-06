const buttonOptions = [
  "resetlevel",
  "help",
  "menu",
  "nextlevel",
  "changelevel",
  "continuegame",
  "solvelevel",
];

export const isAButtonOption = (typeButton) => {
  let isOption = false;
  for (let option of buttonOptions) {
    if (option === typeButton) {
      isOption = true;
      break;
    }
  }
  return isOption;
};

export const addInitialZero = (value) => (+value <= 9 ? `0${value}` : value);
export const haveMinusSign = (value) => ({
  isNegative: value[0] === "-",
  finalNumber: value[0] === "-" ? value.substr(1, value.length) : value,
});
export const getPositionMatrix = (position) => {
  const coordinates = position.split("_");
  return +coordinates[0] * 3 + +coordinates[1];
};
