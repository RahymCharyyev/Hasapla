import baseKeyboards from "../modules/keyboards";
let levels = [];

export const loadLevels = (callback) => {
  fetch("worlds.json")
    .then((r) => r.json())
    .then((json) => {
      levels = json.worlds;
      const level = +localStorage.getItem("levelGame") || 1;
      callback({ level, urls: json.urls });
    });
};

export const maxLevels = () => levels.length;
export const getKeyboard = (level, type = "game") => {
  let screen = { lcd: "Sazlamalar" };
  let solution = [];
  const keyboard = baseKeyboards()[type];
  if (type === "game") {
    screen = levels[level - 1].screen;
    solution = levels[level - 1].solution;
    for (let button in levels[level - 1].buttons) {
      const indexMatrix = button.split("_");
      keyboard[+indexMatrix[0]][+indexMatrix[1]] =
        levels[level - 1].buttons[button];
    }
  } else {
    keyboard[1][1].txt = String(level);
  }
  return { screen, keyboard, solution };
};
