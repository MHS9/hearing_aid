
import './App.css';
import React, {useRef, useEffect} from 'react';
import {writeToCanvas} from './Services/writeToCanvas';
import {getWords} from "./Services/getText"
import{getResult} from "./Services/download"

//import FPS

function App() {
  

  const blank=new Image();
  blank.setAttribute("src","./canvas.jpg")
  blank.height=480;
  blank.width=480;
  let canvasRef = useRef();
     
   useEffect(async() => {
       let canvas = canvasRef.current;
       let context = canvas.getContext('2d');
       const words = getWords()
       for(var i in words){
        var results=await getResult(words[i])
        writeToCanvas(blank ,canvas,context ,results)
  
      }
   

    
    });


 
 

  return (
    <div className="App-header">
      <header className='App-header'>
   
      <div className="canvas-container">
    <canvas ref={canvasRef} style={{ width: '480px', height: '480px' }}/>
    
    </div>
       
      </header>
    </div>
      
    
       
  
  );
}

export default App;

// import React, { useState, useEffect } from 'react';

// const App = () => {
//   const [seconds, setCount] = useState(0);
//   const timer = () => setCount(seconds +1);
// const ws=["i","ii"]
//   useEffect(
//       () => {
        
//         for(var w in ws){
//          console.log(w)
//           if (seconds >= ws.length) {
            
//               return;
            
//           }
//           const id = setInterval(timer, 1000);
//           return () => {clearInterval(id);
//           }}
//       },
//       [seconds]
//   );
  
//   //setCount(0);

 

//   return (
//     <div className="App">
//       <header className="App-header">
//         {seconds} seconds have elapsed since mounting.
//       </header>
//     </div>
//   );
// };

// export default App;
