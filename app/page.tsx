'use client'
import Board from "@/components/board";
import { useState } from "react";

export default function Page() {
  const difficulty = [
    { row: 9, col: 9, name: 'easy', id: 0 },
    { row: 18, col: 18, name: 'medium', id: 1 },
    { row: 18, col: 30, name: 'hard', id: 2 },
  ];
  const [stage, setStage] = useState<number>(0);
  const [selectStage, setSelectStage] = useState<number>(0);
  const handleRadio = (e) => {
    setSelectStage(+e.target.value);
  };
  const handleClick = () => {
    setStage(selectStage);
  };

  return (
    <div className="mx-auto w-full max-w-3xl bg-yellow-100">
      <div>
        Minesweeper
      </div>

      <div>
        <span>
          크기 선택
        </span>

        {difficulty.map(game => (
          <label key={game.id}>
            <input
              type="radio"
              value={game.id}
              checked={selectStage === game.id}
              onChange={handleRadio}
            />
            {game.row}x{game.col}
          </label>
        ))}

        <input
          type='button'
          value='Go!'
          className="border bg-sky-100 active:bg-red-100"
          onClick={handleClick}
        />
      </div>
      
      현재 난이도:{difficulty[stage].name}

      <Board row={difficulty[stage].row} col={difficulty[stage].col} />
    </div>
  );
}