import { useState,useEffect } from "react";
import Swal from "sweetalert2";
import './Sudoko.css'
import LogoImg from './Images/logo.png'
import { useNavigate } from "react-router-dom";
import Sun from './Images/sun-icon.png'
import Moon from './Images/moon-icon.png'

export default function Sudoko(){
  const navigate = useNavigate(); 
  
  const [sudokuGrid, setSudokuGrid] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(""))
  );
  const [sudokuStyle, setsudokuStyle] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(false))
  );
  const [Loading,setLoading]=useState(false);
  const [Solved,setSolved]=useState(false);
  const [DarkMode,setDarkMode]=useState(false);
  
    useEffect(()=>{
      if(DarkMode===false) document.body.classList.remove('dark-theme');
      else document.body.classList.add('dark-theme');
    },[DarkMode])

  let handleChange=(row,col,value)=>{
    let newGrid=sudokuGrid.map((r,rInd)=>(
      r.map((cell,cInd)=>(rInd==row && cInd==col ? value:cell))
    ))
    setSudokuGrid(newGrid);
  }
  let isPos=(i,j,k,sudoko)=>{
    for(let a=0;a<9;a++){
      if(sudoko[a][j]==k || sudoko[i][a]==k) return false;
      else if (sudoko[3 * Math.floor(i / 3) + Math.floor(a / 3)][3 * Math.floor(j / 3) + (a % 3)] == k) return false;
    }
    return true;
  }
  let backTrack=(sudoko,styling)=>{
    for(let i=0;i<9;i++){
      for(let j=0;j<9;j++){
        if(sudoko[i][j]==""){
          for(let k=1;k<=9;k++){
            if(isPos(i,j,k,sudoko)){
              sudoko[i][j] = k.toString();
              styling[i][j]=true;
              if(backTrack(sudoko,styling)) return true;
              else sudoko[i][j]="";
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  let SolveSudoko=async()=>{
    if(Solved) return;
    setLoading(true);
    let sudoko = sudokuGrid.map(row => [...row]); 
    let styling=Array.from({ length: 9 }, () => Array(9).fill(false));
    let val=await backTrack(sudoko,styling);
    if(val){
      setSudokuGrid(sudoko);
      setsudokuStyle(styling);
      setSolved(true);
    }
    setLoading(false)
  }
  return(
    <>
    {Loading && <div className="loading">Solving...</div>}
    <img src={LogoImg} style={{position:'absolute',top:'10px',left:'10px',height:'5vmin',width:'5vmin',cursor:'pointer'}} onClick={()=>navigate('/')}/>
    <img src={(DarkMode)?Sun:Moon} className={`logoimg ${DarkMode?'':'moonimg'}`} onClick={()=>setDarkMode(!DarkMode)}/>

    <section className="mainCenter text-center gamingBoard">
    <h1 className='text-center heading mb-3' style={{fontWeight:"bold",fontFamily:'"Quicksand", serif'}}>Sudoko Solver</h1>
     {sudokuGrid.map((row,rInd)=>(
      <div className="row" key={`${rInd}`}>
        {row.map((cell,cInd)=>(
          <input key={`${rInd}-${cInd}`} type="number"  
          className={`sm
            ${cInd % 3 === 2 ? 'right-border' : ''}
            ${rInd % 3 === 2 ? 'bottom-border' : ''}
            ${cInd === 0 ? 'first-col' : ''}
            ${rInd === 0 ? 'first-row' : ''}
            ${sudokuStyle[rInd][cInd]?'edited':''}
          `}
          min="1" max="9" pattern="[1-9]" value={cell} onChange={(e)=>{
            let val=e.target.value;
            if(val==="" || /^[1-9]$/.test(val)
) handleChange(rInd,cInd,val);
          }}/>
        ))}
      </div>
     ))}
     <button className="btn solve mt-4" onClick={()=>SolveSudoko()}>SOLVE</button>
     <button className="btn solve mt-4" onClick={()=>{
      setSudokuGrid(Array.from({length:9},()=>Array(9).fill("")));
      setsudokuStyle(Array.from({length:9},()=>Array(9).fill(false)));
      setSolved(false);
     }}>RESET</button>
    </section>
    </>
  );
}