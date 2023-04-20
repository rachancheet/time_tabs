import appcontext from "../context/appcontext";
import { useContext, useState } from "react";
import axios from "axios";
// import { redirect } from "next/dist/server/api-utils";
import { redirect } from 'next/navigation';
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie"

export default function log(){
    const router = useRouter()

    const [cookie, setcookie] = useCookies(["user"])
  useEffect((e)=>{
    if(typeof cookie.user == "undefined"){
      setcookie("user", {"name":" ","password":""}, {
        path: "/",
      })

    }
   },[])
   
    // if(router.isReady && typeof cookie.user != "undefined"&& cookie.user.name!=" "){
    //   console.log("loda")
    //     // router.push("/")  
        
    //   }

    // console.log((k)?k.name:"")


    // console.log(cookie["user"]["name"])
    // console.log(cookie["user"]["password"])
    // if(router.isReady && context.login){
    //     // router.push("/")  
    //   }

    const [msg, setmsg] = useState()
  function handleSubmit(e){
    e.preventDefault()
    axios.post("http://127.0.0.1:5000/login",{data:{"name":e.target[0].value,"password":e.target[1].value}}).then((res)=>{
    console.log(res.data)                  
    if((res.data.name) =="fail"){

        setmsg("wrong credentials")
    }
    else{
      // console.log("loda")
        setcookie("user", {"name":res.data.name,"password":res.data.password}, {
        path: "/",
      })
      // setcookie("user", {"name":" ","password":""}, {
      //   path: "/",
      // })

        router.push("/")
    }    
})
  }
  return(
    <>
    <h1></h1>
    <div className="grid h-screen place-items-center">
        <div className="rounded bg-gray-600 bg-opacity-30 align-items">

        <form onSubmit={handleSubmit}>
            <div className="w-3/5 m-10 flex flex-col gap-10">
                <input name ="name" ></input>
                <input name = "password"></input>
            {msg &&(
            <text className="text-red-400 ">{msg}</text>
            )}
                <button  className='bg-lime-400 text-black'> 
            submit
            </button>
            </div>
        </form>
        </div>
    </div>
    </>
  )

}