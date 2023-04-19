import React from "react";
import { useContext } from "react";
import appcontext from "../context/appcontext";
export default function j(){
        const context = React.useContext(appcontext)
        console.log(context)
    const colors = ["red","blue","black","green"]
    const qty = [0,1,2,3,4,5,6,7,8]
    return(
<div>
            
<form onSubmit={(e)=>{
        e.preventDefault();
        context.add_data(e.target[0].value,e.target[1].value)
        // console.log(context.data)
    }}  >
    <div className="flex flex-row space-x-15 m-50 p-50">
<div >

        <select>  

            {(colors.map((f,index)=>(
                <option key={index} value = {f}> {f}  </option> )
                )
                )};

        </select>  
</div>
<div>

        <select>  

                    
            {(qty.map((f,index)=>(
                <option key={index} value = {f}> {f}  </option> )
                )
                )};

        </select>  
</div>
    </div>
    <div className="flex flex-row-reverse m-10">

            <button  className='bg-lime-400 text-black rounded'> 
            add to cart
            </button>
    </div>
</form>

        <div className="navbar bg-base-100">
  <div className="flex-row m-600 space-x-40  text-slate-500/90 bg-white ">
          {context && context.data.color.map((f,index)=>(
            <>
            
            <a>{f}:{context.data.qty[index]} </a>
            
            </>

          ))
          }
  </div>
  </div>

</div>
        )
}