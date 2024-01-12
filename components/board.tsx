import { useEffect, useState, memo } from "react";
const dx = [-1, -1, -1, 0, 1, 1, 1, 0];
const dy = [-1, 0, 1, 1, 1, 0, -1, -1];

const initialize = (allMine, setField, setView, row, col) => {
  const temp = new Array(row * col).fill(0);
  const tempField = new Array(row).fill(0).map(() => new Array(col).fill(0));
  setView(tempField.map(arr => [...arr]));
  for (let i = 0; i < allMine; i++) temp[i] = -1;
  for (let i = 0; i < row * col; i++) {   // 배열 무작위 섞기(Fisher-Yates shuffle)
    let j = Math.floor(Math.random() * (i + 1));
    [temp[i], temp[j]] = [temp[j], temp[i]];
  }
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      tempField[i][j] = temp[i * col + j];
    }
  }
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (tempField[i][j] === -1) continue;
      let nearMine = 0;
      for (let k = 0; k < 8; k++) {
        let x = i + dx[k];
        let y = j + dy[k];
        if (x >= 0 && x < row && y >= 0 && y < col && tempField[x][y] === -1) nearMine++;
      }
      tempField[i][j] = nearMine;
    }
  }
  setField(tempField.map(arr => [...arr]));
}

const Board = ({ row, col }) => {
  const allMine = Math.floor(row * col * 0.15);
  const [field, setField] = useState([]);
  const [view, setView] = useState([]);
  const [mine, setMine] = useState<number>(allMine);

  useEffect(() => {
    initialize(allMine, setField, setView, row, col);
  }, [row])

  const clickHandler = (i, j) => {
    const copyView = view.map(arr => [...arr]);
    const q = [];
    q.push({ x: i, y: j });
    while (q.length) {
      const { x, y } = q[0];
      copyView[x][y] = 1;
      q.shift();
      if (field[x][y] > 0) continue;
      for (let i = 0; i < 8; i++) {
        const xx = x + dx[i];
        const yy = y + dy[i];
        if (xx >= 0 && xx < row && yy >= 0 && yy < col && field[xx][yy] !== -1 && !copyView[xx][yy]) q.push({ x: xx, y: yy });
      }
    }
    setView(copyView.map(arr => [...arr]));
  }

  return (
    <div className="w-full">
      {view.map((oneRow, i) => (
        <div key={i} className="grid grid-flow-col place-content-center">
          {oneRow.map((room, j) => (
            <button
              key={j}
              className={`h-10 w-10 border border-black ${room ? 'bg-white' : 'bg-slate-400'}`}
              onClick={(e) => clickHandler(i, j)}>
              {room ? field[i][j] : null}
            </button>
          ))}
        </div>
      ))}

      <button className="bg-green-200" onClick={() => initialize(allMine, setField, setView, row, col)}>
        다시하기
      </button>
    </div>
  );
}

export default memo(Board)