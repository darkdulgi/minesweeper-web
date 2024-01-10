import { useEffect, useState, memo } from "react";

const initialize = (firstMine, setField, row, col) => {
  setField([]);
  let temp = new Array(row * col).fill(0);
  let tempField = new Array(row).fill(0).map(() => new Array(col).fill(0));
  for (let i = 0; i < firstMine; i++) temp[i] = 1;
  for (let i = 0; i < row * col; i++) {   // 배열 무작위 섞기(Fisher-Yates shuffle)
    let j = Math.floor(Math.random() * (i + 1));
    [temp[i], temp[j]] = [temp[j], temp[i]];
  }
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      tempField[i][j] = temp[i * col + j];
    }
  }
  setField(tempField)
}

const Board = ({ row, col }) => {
  const firstMine = Math.floor(row * col * 0.15);
  const [field, setField] = useState([]);
  const [mine, setMine] = useState<number>(firstMine);

  useEffect(() => {
    initialize(firstMine, setField, row, col);
  }, [row])

  return (
    <div className="w-full">
      {field.map((oneRow, i) => (
        <div key={i} className="grid grid-flow-col place-content-center">
          {oneRow.map((room, j) => (
            <button key={j} className="h-10 w-10 border border-black bg-slate-100 hover:bg-slate-300">
              {room ? <img className="" src="mine.png" /> : null}
            </button>
          ))}
        </div>
      ))}

      <button className="bg-green-200" onClick={() => initialize(firstMine, setField, row, col)}>
        다시하기
      </button>
    </div>
  );
}

export default memo(Board)