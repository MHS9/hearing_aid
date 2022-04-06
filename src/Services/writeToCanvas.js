   
     import {draw} from "./writeDataPoints"
      export const writeToCanvas=(blank ,canvas,ctx,results)=> {
          for(var key in Object.keys(results)){
              console.log(key)
              setTimeout(()=>{ draw(blank ,canvas,ctx,results[key])},key*100)
          }

     }
    
     