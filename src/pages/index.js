import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useCookies } from 'react-cookie';


export default function show(){
  // const [where, upwhere] = useState("")
  // function handlechange(){
  //   upwhere("e.target.value");
  // }



  const [cookie, setcookie] = useCookies(["user"])

  useEffect((e)=>{
    if(typeof cookie.user == "undefined"){
      setcookie("user", {"name":" ","password":""}, {
        path: "/",
      })

    }
   },[])
  return(
    <div>
      {/* <h1>
        {api_key}
      </h1> */}
    {/* <form className="" onSubmit={`${where}`}> */}
    {/* {posts.map((post) => ())} */}
  
    <Link href="/show/cs9" >cs9</Link>
    <Link href="/show/cs10" >cs10</Link>
    {/* <Link href="/cs9" >cs9</Link>
    <Link href="/cs9" >cs9</Link>import cookieCutter from 'cookie-cutter' */}

    {/* <label >which schedule do you want to see:</label>
    <input onChange = {handlechange} type="text" id="name" name="name" required /> */}

    {/* </form> */}
    </div>

  )
}