import { useState } from "react";
import './Sudoko.css'

export default function Sudoko(){
  const [sudokuGrid, setSudokuGrid] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(""))
  );
  let handleChange=(row,col,value)=>{
    let newGrid=sudokuGrid.map((r,rInd)=>(
      r.map((cell,cInd)=>(rInd==row && cInd==col ? value:cell))
    ))
    setSudokuGrid(newGrid);
  }
  return(
    <div className="mt-3">
     {sudokuGrid.map((row,rInd)=>(
      <div className="row" key={`${rInd}`}>
        {row.map((cell,cInd)=>(
          <input key={`${rInd}-${cInd}`} type="number"  
          className={`sm
            ${cInd % 3 === 2 ? 'right-border' : ''}
            ${rInd % 3 === 2 ? 'bottom-border' : ''}
            ${cInd === 0 ? 'first-col' : ''}
            ${rInd === 0 ? 'first-row' : ''}
          `}
          min="1" max="9" pattern="[1-9]" value={cell} onChange={(e)=>{
            let val=e.target.value;
            if(val==="" || /^[1-9]$/.test(val)
) handleChange(rInd,cInd,val);
          }}/>
        ))}
      </div>
     ))}
     <button className="btn solve mt-3">SOLVE</button>
    </div>
  );
}