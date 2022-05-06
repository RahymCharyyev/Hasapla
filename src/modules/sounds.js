import { Howl } from "howler";

export default new Howl({
  src: ["sound_1.mp3"],
  sprite: {
    click: [50, 310],
    winner: [330, 1500],
    lose: [1500, 2500],
  },
});
