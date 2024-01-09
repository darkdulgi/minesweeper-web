import { useEffect, useState, memo } from "react";

const Board = ({ row, col }) => {
  const [cnt, setCnt] = useState(0);

  useEffect(() => {
    setCnt(0);
    console.log('초기화')
  }, [row])
  return (
    <div className=''>
      {cnt}
      <button onClick={() => setCnt(x => (x + 1))}>클릭</button>
    </div>
  );
}

export default memo(Board)