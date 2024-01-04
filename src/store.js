import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { hangeuls } from "./constants";

export const gameStates = {
  MENU: "MENU",
  GAME: "GAME",
  GAME_OVER: "GAME_OVER",
};

export const playAudio = (path, callback) => {
  const audio = new Audio(`./sounds/${path}.mp3`);
  if (callback) {
    audio.addEventListener("ended", callback);
  }
  audio.play();
};

export const generateGameLevel = ({ nbStages }) => {
  const level = [];
  const goodHangeuls = [];

  for (let i = 0; i < nbStages; i++) {
    const stage = [];
    const nbOptions = 3 + i;
    for (let j = 0; j < nbOptions; j++) {
      let hangeul = null;
      while (!hangeul || stage.includes(hangeul) || goodHangeuls.includes(hangeul)) {
        hangeul = hangeuls[Math.floor(Math.random() * hangeuls.length)];
      }
      stage.push(hangeul);
    }
    const goodHangeul = stage[Math.floor(Math.random() * stage.length)];
    goodHangeul.correct = true;
    goodHangeuls.push(goodHangeul);
    level.push(stage);
  }
  return level;
};

export const useGameStore = create(
  subscribeWithSelector((set, get) => ({
    level: null,
    currentStage: 0,
    currentHangeul: null,
    mode: "korean",
    gameState: gameStates.MENU,
    wrongAnswers: 0,
    startGame: ({ mode }) => {
      const level = generateGameLevel({ nbStages: 5 });
      const currentHangeul = level[0].find((hangeul) => hangeul.correct);
      playAudio("start", () => {
        playAudio(`hangeuls/${currentHangeul.character}`);
      });
      set({
        level,
        currentStage: 0,
        currentHangeul,
        gameState: gameStates.GAME,
        mode,
        wrongAnswers: 0,
      });
    },
    nextStage: () => {
      set((state) => {
        if (state.currentStage + 1 === state.level.length) {
          playAudio("congratulations");
          return {
            currentStage: 0,
            currentHangeul: null,
            level: null,
            gameState: gameStates.GAME_OVER,
        
          };
        }
        const currentStage = state.currentStage + 1;
        const currentHangeul = state.level[currentStage].find(
          (hangeul) => hangeul.correct
        );

        playAudio("good", () => {
          playAudio(`hangeuls/${currentHangeul.character}`);
        });
        return { currentStage, currentHangeul };
      });
    },
    goToMenu: () => {
      set({
        gameState: gameStates.MENU,
      });
    },
    hangeulTouched: (hangeul) => {
      const currentHangeul = get().currentHangeul;
      if (currentHangeul.character === hangeul.character) {
        get().nextStage();
      } else {
       
        playAudio("wrong", () => {
          playAudio(`hangeuls/${hangeul.character}`);
        });
        set((state) => ({
          wrongAnswers: state.wrongAnswers + 1,
         
        }));
      }
    },
    // Character controller
    characterState: "Idle",
    setCharacterState: (characterState) =>
      set({
        characterState,
      }),

  }))
);