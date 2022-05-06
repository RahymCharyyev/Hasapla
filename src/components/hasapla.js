import React, { Component } from "react";
import LCD from "./LCD";
import Keyboard from "./Keyboard";
import { getKeyboard, loadLevels, maxLevels } from "../selectors/levels";
import operations from "../modules/operations";
import sounds from "../modules/sounds";
import { isAButtonOption, getPositionMatrix } from "../modules/utils";
import "../styles/hasapla.css";

let urlsButtons = {};

class Hasapla extends Component {
  state = {
    numLevel: 0,
    typeKeyboard: "",
    error: false,
    finishLevel: false,
    outofmoves: false,
    modeResolve: false,
    ordenResolve: 0,
    screen: {
      level: 0,
      face: "",
      moves: 0,
      goal: "0",
      lcd: "Ýüklenýär...",
    },
    keyboard: [],
    solution: [],
  };

  loadlevel = (level, type = "game") => {
    if (type === "game") {
      localStorage.setItem("levelGame", String(level));
    }
    const newLevel = getKeyboard(level, type);
    this.setState(() => ({
      numLevel: level,
      typeKeyboard: type,
      error: false,
      finishLevel: false,
      outofmoves: false,
      modeResolve: false,
      ordenResolve: 0,
      screen: {
        face: "happy",
        level,
        ...newLevel.screen,
      },
      keyboard: newLevel.keyboard,
      solution: newLevel.solution,
    }));
  };

  handlePressButton = (button, position) => {
    sounds.play("click");
    const buttonOption = isAButtonOption(button.type);
    if (!buttonOption) {
      const acceptAction = this.state.modeResolve
        ? getPositionMatrix(position) ===
          this.state.solution[this.state.ordenResolve]
        : true;
      if (acceptAction) {
        const { error, changeState, newState } = operations[button.type](
          String(this.state.screen.lcd),
          button.params || {}
        );
        if (!error) {
          if (changeState) {
            const prevState = { ...this.state };
            if (+newState === +this.state.screen.goal) {
              sounds.play("winner");
              prevState.finishLevel = true;
              prevState.keyboard[0][2] = {
                color: "darkgreen",
                type: "nextlevel",
                txt: "OK",
              };
              prevState.keyboard[2][0] = prevState.keyboard[0][0] = null;
            } else if (this.state.screen.moves - 1 <= 0) {
              prevState.outofmoves = true;
              prevState.screen.face = "sad";
              sounds.play("lose");
              prevState.keyboard[0][0] = null;
            }
            if (this.state.modeResolve) {
              prevState.ordenResolve++;
            }
            prevState.screen = {
              ...prevState.screen,
              lcd: String(newState),
              moves: this.state.screen.moves - 1,
            };
            this.setState(() => prevState);
          }
        } else {
          this.setState(() => ({ error: true, screen: { lcd: "ERROR" } }));
        }
      }
    } else {
      if (button.type === "resetlevel") {
        this.loadlevel(this.state.numLevel);
      } else if (button.type === "nextlevel") {
        const numLevel =
          this.state.numLevel + 1 <= maxLevels() ? this.state.numLevel + 1 : 1;
        this.loadlevel(numLevel);
      } else if (button.type === "menu") {
        this.loadlevel(this.state.numLevel, "menu");
      } else if (button.type === "changelevel") {
        const maxLevelsExist = maxLevels();
        const numLevel =
          this.state.numLevel + button.params.value <= 0
            ? maxLevelsExist
            : this.state.numLevel + button.params.value > maxLevelsExist
            ? 1
            : this.state.numLevel + button.params.value;
        const keyboardBase = [...this.state.keyboard];
        keyboardBase[1][1].txt = String(numLevel);
        this.setState(() => ({
          numLevel,
          keyboard: keyboardBase,
        }));
      } else if (button.type === "continuegame") {
        this.loadlevel(this.state.numLevel);
      } else if (button.type === "code" || button.type === "page") {
        window.open(urlsButtons[button.type], "_blank");
      } else if (button.type === "solvelevel") {
        this.loadlevel(this.state.numLevel);
        const keyboardBase = [...this.state.keyboard];
        keyboardBase[0][0] = keyboardBase[0][2] = keyboardBase[2][0] = null;
        this.setState(() => ({
          modeResolve: true,
          keyboard: keyboardBase,
        }));
      }
    }
  };

  componentDidMount() {
    loadLevels((data) => {
      urlsButtons = data.urls;
      this.loadlevel(data.level);
    });
  }

  render() {
    const disabled =
      this.state.error || this.state.finishLevel || this.state.outofmoves;
    return (
      <div className="flex-container">
        <div className="container">
          <div className="frame_game">
            <LCD
              {...this.state.screen}
              typeKeyboard={this.state.typeKeyboard}
            />
            <Keyboard
              keyboard={this.state.keyboard}
              resolveWorld={{
                modeResolve: this.state.modeResolve,
                orden: this.state.solution[this.state.ordenResolve],
              }}
              disabled={disabled}
              handlePressButton={this.handlePressButton}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Hasapla;
