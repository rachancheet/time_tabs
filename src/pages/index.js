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

  if(typeof cookie.user == "undefined"){
    setcookie("user", {"name":" ","password":""}, {
      path: "/",
    })
  }
  
  return(
    <div>
      {/* <h1>
        {api_key}
      </h1> */}
    {/* <form className="" onSubmit={`${where}`}> */}
    {/* {posts.map((post) => ())} */}
  <div className='flex h-screen justify-center items-center'>
<div className='flex p-10 shrink-0 align-center border-2 rounded-md border-[#e0f2fe]'>

    <Link href="/show/cs9" ><button class="py-2 px-4 shadow-md no-underline rounded-full bg-[#16a34a] text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2">Cs9</button>
  </Link>
    <Link href="/show/cs10" ><button class="py-2 px-4 shadow-md no-underline rounded-full bg-[#16a34a] text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2">Cs10</button>
  </Link>
</div>
  </div>
    {/* <Link href="/cs9" >cs9</Link>
    <Link href="/cs9" >cs9</Link>import cookieCutter from 'cookie-cutter' */}

    {/* <label >which schedule do you want to see:</label>
    <input onChange = {handlechange} type="text" id="name" name="name" required /> */}

    {/* </form> */}
    </div>

  )
}