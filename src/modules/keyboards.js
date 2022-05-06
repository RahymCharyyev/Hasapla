export default () => ({
  game: [
    [
      {
        color: "lightgreen",
        type: "solvelevel",
        txt: "Kömek",
      },
      null,
      {
        color: "darkred",
        type: "resetlevel",
        txt: "Bozmak",
      },
    ],
    [null, null, null],
    [
      {
        color: "lightblue",
        type: "menu",
        txt: "Sazlamalar",
      },
      null,
      null,
    ],
  ],
  menu: [
    [null, null, null],
    [
      {
        color: "lightblue",
        type: "changelevel",
        params: { value: -1 },
        txt: "-",
      },
      {
        color: "darkblue",
        type: "showlevel",
        txt: "0",
      },
      {
        color: "lightblue",
        type: "changelevel",
        params: { value: 1 },
        txt: "+",
      },
    ],
    [
      null,
      {
        color: "darkred",
        type: "continuegame",
        txt: "Oýna!",
      },
      null,
    ],
  ],
});
