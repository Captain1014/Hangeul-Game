import { gameStates, useGameStore } from "../store";

export const Menu = () => {
  const { startGame, gameState, goToMenu } = useGameStore((state) => ({
    startGame: state.startGame,
    gameState: state.gameState,
    goToMenu: state.goToMenu,
  }));
  return (
    <>
      <div
        className={`menu ${
          gameState !== gameStates.MENU ? "menu--hidden" : ""
        }`}
      >
        <div>
          <h1>Hangeul Game</h1>
          
        </div>
        <button
          disabled={gameState !== gameStates.MENU}
          onClick={() => startGame({ mode: "korean" })}
        >
          Play
        </button>
       
        <div>
          <p>
            Made by{" "}
            <a href="https://www.linkedin.com/in/dohyun-chung/" target="_blank">
              Leah Chung
            </a>
            , 3D models from{" "}
            <a href="https://sketchfab.com/3d-models/low-poly-cherry-blossom-tree-3d-models-4b76fd63c81e4d489cc06ec66c12a866" target="_blank">
              Sketchfab
            </a>
          </p>
        </div>
      </div>
      <div
        className={`scores ${
          gameState !== gameStates.GAME_OVER ? "scores--hidden" : ""
        }`}
      >
        <h1>Congratulations! 🥳</h1>
        <button
          onClick={goToMenu}
          disabled={gameState !== gameStates.GAME_OVER}
        >
          Play again
        </button>
      </div>
    </>
  );
};