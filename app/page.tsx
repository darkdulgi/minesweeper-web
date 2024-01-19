'use client'
import Board from "@/components/board";
import { useState } from "react";

export default function Page() {
  const difficulty = [
    { row: 9, col: 9, name: 'Easy', id: 0 },
    { row: 18, col: 18, name: 'Medium', id: 1 },
    { row: 18, col: 30, name: 'Hard', id: 2 },
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
    <div className="bg-yellow-100 min-h-screen h-full">
      <div className="mx-auto w-full flex flex-col items-center pt-3 gap-2">
        <div className="font-mono text-5xl font-bold">
          Minesweeper
        </div>

        <div className="flex items-center gap-3">
          <span>
            크기 선택
          </span>
          <div className="flex flex-col">
            {difficulty.map(game => (
              <label key={game.id}>
                <input
                  type="radio"
                  className="mr-1"
                  value={game.id}
                  checked={selectStage === game.id}
                  onChange={handleRadio}
                />
                {game.row} x {game.col}
              </label>
            ))}
          </div>

          <input
            type='button'
            value='Go!'
            className="bg-sky-200 text-gray-600 font-bold px-3 py-1 rounded-lg hover:bg-red-200 active:bg-red-400 transition ease-in-out"
            onClick={handleClick}
          />
        </div>

        <div>
          <span className="text-gray-500">
            {`현재 난이도 : `}
          </span>

          <span className={`font-bold ${stage === 0 ? 'text-green-500':(stage === 1 ? 'text-blue-700' : 'text-red-700')}`}>
            {difficulty[stage].name}
          </span>
        </div>
        
        <Board row={difficulty[stage].row} col={difficulty[stage].col} />
      </div>
    </div>

  );
}