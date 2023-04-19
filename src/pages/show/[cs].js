import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { resolve } from 'styled-jsx/css';
import { useContext } from 'react';
import appcontext from '../../context/appcontext';
import { useCookies } from 'react-cookie';

export default function ok() {

  const [cookie, setcookie] = useCookies(["user"])


  useEffect((e)=>{
    if(typeof cookie.user.name == "undefined"){
      setcookie("user", {"name":" ","password":""}, {
        path: "/",
      })

    }
   },[])
  const [fact, setfact] = useState([[]])
  // setfact(props.cs);
  const router = useRouter()
  const {cs} = router.query;

  // console.log(context)
  useEffect(()=>{
    console.log(cs)
    axios.get(`http://127.0.0.1:5000/get_data/${cs}`).then((response)=>{

      // console.log("data");
      // console.log(response.data);
      setfact(response.data)
    })

  },[router])

  // setfact(tabs)
  // setcsrouter.query
  // let containerRef = useRef(null);
  // let gh = containerRef.children[0];`
  

    // return fact;
  
  
  function update_page(e){
    e.preventDefault();
    // console.log("loda")
    router.push(`/change/${cs}`)
  }




    // ////console.log("loda")
  const weekday = ["mondays", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  const timings = ["8:50-9:40", "9:40-10:30", "10:30-11:20", "11:20-12:10", "12:10-1:00", "1:00-1:50", "1:50-2:40", "2:40-3:30", "3:30-4:20", "4:20-5:10"]




  const [input, setinput] = useState(1)
  // const [form, setform] = useState(fact)
  const [day, setday] = useState(0)
  const [dayview, setdayview] = useState([fact[0]])

  //  function handlechange(e){
  //   let name =e.target.name;
  //   setform({...form,
  //     [e.target.name]:[...e.target.name,e.target.value]})
  //     ////console.log(form);
  //   }
  // function handlesubmit(e){
  //   e.preventDefault();
  //   //console.log(fact);
  //   axios.post(`http://127.0.0.1:5000/post/${cs}`, {
  //       title: "sending data",
  //       baby:fact
  //     }).then((response) => {
  //       // setfact(response.data);
  //       console.log(response.data)
  
  //     }).catch(function (error) {
  //       console.log(error);
  //     });
  // }


  return (
    <>

    <div className='flex flex-col'>
      <div className='flex flex-row w-120 m-10 space-x-10'>

       {fact.map((name,index)=>(
          <div key ={index} className='flex flex-col space-y-5'>
            <h1>
              {weekday[index]}
            </h1>
            {
              name.map((nm,index2) => (
                <div key ={index2} className='flex flex-col'>
                  {timings[index2]}: {nm}
                </div>
              ))
            }
          </div>
       ))}

            </div>


<div className='flex flex-row-reverse w-120 m-10 space-x-10'>

    <form onSubmit={update_page}  >
            <button  className='bg-lime-400 text-black'> 
            edit
            </button>
    </form>
    <form onSubmit={(e)=>{
      e.preventDefault()
      setcookie("user", {"name":" ","password":""}, {
        path: "/",
      })
    }}  >
            <button  className='bg-lime-400 text-black'> 
            sign out
            </button>
    </form>


     </div>
     <div className='flex min-w-full'>
     <table class="table-auto">
  <thead>
    <tr>
      <th>Song</th>
      <th>Artist</th>
      <th>Year</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The Sliding </td>
      <td>Malcolm Lockyer</td>
      <td>1961</td>
    </tr>
    <tr>
      <td>Witchy Woman</td>
      <td>The Eagles</td>
      <td>1972</td>
    </tr>
    <tr>
      <td>Shining Star</td>
      <td>Earth, Wind, and Fire</td>
      <td>1975</td>
    </tr>
  </tbody>
</table>
</div>

</div>
</>
  )
}












 