import { useEffect, memo } from "react";
import initialize from "@/components/initialize";
import useGameState from "@/store/gameStateStore";

const dx = [-1, -1, -1, 0, 1, 1, 1, 0];
const dy = [-1, 0, 1, 1, 1, 0, -1, -1];
const COLOR_SET = [
  '',
  'text-blue-600',
  'text-green-600',
  'text-red-500',
  'text-blue-900',
  'text-red-800',
];

const seeAllMine = (setView, view, field, row, col) => {
  const copyView = view.map(arr => [...arr]);
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (field[i][j] === -1) copyView[i][j] = 1;
    }
  }
  setView(copyView);
}

const Board = ({ row, col }) => {
  const { field, view, failed, leftRoom, setField, setView, setFailed, setLeftRoom }: any = useGameState();
  const allMine = Math.floor(row * col * 0.15);
  useEffect(() => {
    initialize(setView, setField, setFailed, setLeftRoom, allMine, row, col);
  }, [row, col]);

  const leftClickHandler = (i, j) => {
    if (view[i][j] < 0) return;
    if (field[i][j] === -1) {
      setFailed(1);
      seeAllMine(setView, view, field, row, col);
      return;
    }
    const copyView = view.map(arr => [...arr]);
    let currentLeftRoom = leftRoom;
    const q = [];
    q.push({ x: i, y: j });
    copyView[i][j] = 1;
    while (q.length) {
      const { x, y } = q[0];
      currentLeftRoom--;
      q.shift();
      if (field[x][y] > 0) continue;
      for (let i = 0; i < 8; i++) {
        const xx = x + dx[i];
        const yy = y + dy[i];
        if (xx >= 0 && xx < row && yy >= 0 && yy < col && field[xx][yy] !== -1 && copyView[xx][yy] <= 0) {
          copyView[xx][yy] = 1;
          q.push({ x: xx, y: yy });
        }
      }
    }
    setView(copyView);
    setLeftRoom(currentLeftRoom);
    if (currentLeftRoom === allMine) {
      setFailed(-1);
      seeAllMine(setView, view, field, row, col);
    }
  };

  const rightClickHandler = (e, i, j) => {
    e.preventDefault();
    if (view[i][j] > 0 || failed) return;
    const copyView = view.map(arr => [...arr]);
    if (--copyView[i][j] < -2) copyView[i][j] = 0;
    setView(copyView);
  };

  return (
    <div className="w-full flex flex-col items-center gap-1">
      <img src={failed ? (failed > 0 ? 'angry.png' : 'happy.png') : 'face.png'} className="h-12" />

      <div>
        {view.map((oneRow, i) => (
          <div key={i} className="grid grid-flow-col place-content-center">
            {oneRow.map((room, j) => (
              <button
                key={j}
                disabled={failed}
                className={`flex items-center justify-center h-9 w-9 border text-3xl font-bold border-black ${room === 1 ? (field[i][j] === -1 ? (failed > 0 ? 'bg-red-300' : 'bg-blue-300') : 'bg-white ' + COLOR_SET[field[i][j]]) : 'bg-slate-300 ' + (failed ? null : 'hover:bg-slate-400')}`}
                onClick={() => leftClickHandler(i, j)}
                onContextMenu={(e) => rightClickHandler(e, i, j)}
              >
                {room === 1
                  ? (field[i][j] !== 0
                    ? (field[i][j] === -1 ?
                      <img src="mine.png" />
                      : field[i][j]) : null)
                  : (room === -1
                    ? <img src="flag.png" />
                    : (room === -2
                      ? <img src="question.png" />
                      : null))}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className={`font-bold ${failed > 0 ? 'text-red-500' : null}`}>
        {failed ? (failed > 0 ? '지뢰가 폭발했습니다!' : '모든 지뢰를 찾아냈습니다!') : '지뢰가 없는 모든 칸을 찾아내세요!'}
      </div>

      <button className="bg-gradient-to-r from-green-300 to-blue-300 text-gray-600 font-bold text-sm rounded-xl px-4 py-2 transition ease-in-out hover:shadow-md" onClick={() => initialize(setView, setField, setFailed, setLeftRoom, allMine, row, col)}>
        다시하기
      </button>
    </div>
  );
}

export default memo(Board)