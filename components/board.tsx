import { useEffect, useState, memo } from "react";
import initialize from "@/components/initialize";

const dx = [-1, -1, -1, 0, 1, 1, 1, 0];
const dy = [-1, 0, 1, 1, 1, 0, -1, -1];

const seeAllMine = (field, view, setView, setFailed, row, col) => {
  const copyView = view.map(arr => [...arr]);
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (field[i][j] === -1) copyView[i][j] = 1;
    }
  }
  setView(copyView.map(arr => [...arr]));
  setFailed(true);
}

const Board = ({ row, col }) => {
  const allMine = Math.floor(row * col * 0.15);
  const [field, setField] = useState([]);
  const [view, setView] = useState([]);
  const [mine, setMine] = useState<number>(allMine);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    initialize(setField, setView, setFailed, allMine, row, col);
  }, [row])

  const clickHandler = (i, j) => {
    if (field[i][j] === -1) {
      alert('실패!');
      seeAllMine(field, view, setView, setFailed, row, col);
      return;
    }
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
              disabled={failed}
              className={`h-10 w-10 border border-black ${room ? (field[i][j] === -1 ? 'bg-red-300' : 'bg-white') : 'bg-slate-400'}`}
              onClick={() => clickHandler(i, j)}>
              {room ? (field[i][j] !== 0 ? (field[i][j] === -1 ? <img src='/mine.png' /> : field[i][j]) : null) : null}
            </button>
          ))}
        </div>
      ))}

      <button className="bg-green-200" onClick={() => initialize(setField, setView, setFailed, allMine, row, col)}>
        다시하기
      </button>
    </div>
  );
}

export default memo(Board)