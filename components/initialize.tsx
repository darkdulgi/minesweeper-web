const dx = [-1, -1, -1, 0, 1, 1, 1, 0];
const dy = [-1, 0, 1, 1, 1, 0, -1, -1];

export default function initialize (setView, setField, setFailed, setLeftRoom, allMine, row, col) {
  const temp = new Array(row * col).fill(0);
  const tempField = new Array(row).fill(0).map(() => new Array(col).fill(0));
  setView(tempField);
  setFailed(false);
  setLeftRoom(row * col);
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
  setField(tempField);
}